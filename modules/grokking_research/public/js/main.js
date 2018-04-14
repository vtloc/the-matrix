var app = new Vue({
  el: '#app',
  data: {
    events: []
  },
  methods: {
  	remove: function(event) {

  		Vue.http.post('/grokking_research/events/' + event._id + '/remove').then(function(data) {
			console.log(data);

			reloadEvents();
		}, function(error) {
			console.log(error)
		});
  	}
  }
})

var newEvent = new Vue({
	el: '#new_event',
	data: {
		date: '',
		member: '',
		topic: ''
	},
	methods: {
		submit: function() {
			var body = {
				date: this.date,
				member: this.member,
				topic: this.topic
			};

			Vue.http.post('/grokking_research/events', body).then(function(data) {
				console.log(data);

				reloadEvents();
			}, function(error) {
				console.log(error)
			});

			this.date = '';
			this.member = '';
			this.topic = '';
			
		}
	}
})

var newSlackMessage = new Vue({
	el: '#new_slack',
	data: {
		message: '',
		channel: '',
		channels: []
	},
	methods: {
		submit: function() {
			var body = {
				message: this.message,
				channel: this.channel
			};

			Vue.http.post('/slack/send_message', body).then(function(data) {
				console.log(data);


			}, function(error) {
				console.log(error)
			});

			this.message = '';
		}
	}

})

function reloadEvents() {
	app.events = []

	Vue.http.get('/grokking_research/events?t='+(new Date()), {}).then(function(data) {
		console.log(data);

		for(var i=0; i<data.body.events.length; i++)
		{
			var item = data.body.events[i];

			app.events.push(item)
		}


	}, function(error) {
		console.log(error)
	});
}

function reloadChannels() {
	newSlackMessage.channels = [];

	Vue.http.get('/slack/channels?t='+(new Date()), {}).then(function(data) {
		console.log('channels:', data);

		for(var i=0; i<data.body.length; i++)
		{
			var item = data.body[i];

			newSlackMessage.channels.push(item)
		}


	}, function(error) {
		console.log(error)
	});
}


window.onload = function() {
	reloadEvents();
	reloadChannels();
}