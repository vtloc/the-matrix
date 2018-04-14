
const path = require('path');
const request = require('request'); 
const SLACK_CHANNEL_HOOKS = {
	"loc_test" : "https://hooks.slack.com/services/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",
	"grokking_assistant": "https://hooks.slack.com/services/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",
	"content": "https://hooks.slack.com/services/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",
	"general": "https://hooks.slack.com/services/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",
	"random": "https://hooks.slack.com/services/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"
};
const CHANNELS = [
	"grokking_assistant",
	"general",
	"content",
	"random"
];
const NotificationService = require('../notifications/services');

/*
This Events API-only event type has no "inner event". 
Instead, the complete payload you'll receive is similar to this JSON:
{
    "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl",
    "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
    "type": "url_verification"
}

Once you receive the event, respond in plaintext with the challenge attribute value. 
*/

exports.incoming_events = (req, res) => {
	console.log('received events: ', req.body);

	if(req.body.challenge)
	{
		// only use when we need to register the new app
		let challenge = req.body.challenge;

  		return res.send(challenge);
	}

	var authed_user = req.body.authed_users[0];

	// process the event
	if(req.body.event.text.indexOf('@' + authed_user)) {


		// someone mentioned me
		console.log('someone mentioned me ', authed_user);

		const notif = {
			message: "Incoming message from channel " + req.body.event.channel + ":" + req.body.event.text,
			timestamp: req.body.event_time,
			source: "Grokking Slack",
			link: "#"
		}
		NotificationService.insertNotif(notif);
	}

	return res.send('ok')
  
};

exports.send_message = (req, res) => {
	console.log(req.body);

	var request_params = {
		url: SLACK_CHANNEL_HOOKS[req.body.channel],
		// url: "http://e6cabb54.ngrok.io/slack/incoming_events",
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			text: req.body.message
		})
	}

	request(request_params, function(err, response, body) {
		if(err) {
			console.log(err);
			return res.send('error');
		}
      
      	// console.log(response);

      	res.json(body); 
	})

	// request(request_params, function(err, response, body){
	// 	if(err) {
	// 		console.log(err);
	// 		return res.send('error');
	// 	}
      
      	
 //      	res.json(body); 
 //  	});
}

exports.get_channels = (req, res) => {
	res.json(CHANNELS);
}