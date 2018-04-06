const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const readline = require('readline');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(__dirname, 'credentials.json');

const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

exports.index = (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
};

exports.events = (req, res) => {
  var query = req.query.q;

  // Load client secrets from a local file.
  var secretPath = path.join(__dirname, 'client_secret.json')
	fs.readFile(secretPath, (err, content) => {
	  if (err) {
	    console.log(err);
	    return console.log('Error loading client secret file:', err);
	  }

	  // Authorize a client with credentials, then call the Google Drive API.
	  authorize(JSON.parse(content), function(auth) {

	  	var params = {
	  		calendarId: "holistics.io_mij96drf0tmf3p0pv91pmk7c3s@group.calendar.google.com",
	  		query: query
	  	}

	    listEvents(auth, params, function(events) {
	    	res.send(JSON.stringify(events));
	    })
	  });
	});
}

exports.createEvent = (req, res) => {
	var secretPath = path.join(__dirname, 'client_secret.json')
	fs.readFile(secretPath, (err, content) => {
	  if (err) {
	    console.log(err);
	    return console.log('Error loading client secret file:', err);
	  }

	  // Authorize a client with credentials, then call the Google Drive API.
	  authorize(JSON.parse(content), function(auth) {

	  	var params = {
	  		calendarId: "holistics.io_mij96drf0tmf3p0pv91pmk7c3s@group.calendar.google.com",
	  		date: req.body.date,
	  		name: req.body.description,
	  		email: req.body.email 
	  	}

	    holisticsInsertSupportEvent(auth, params);
	    res.send(JSON.stringify({"status": "ok"}));
	  });
	});
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      console.log(err);
      return;
    } 

    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)  {
        console.log(err);
        return callback(err);
      }

      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
   });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, params, callback) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: params.calendarId,
    timeMin: (new Date()).toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
    q: params.query
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);

    callback(data.items);
    
  });
}


function addEvent(auth) {
  var event = {
    'summary': 'Support - Huy',
    'start': {
      'date': '2018-04-07',
      'timeZone': 'Asia/Saigon',
    },
    'end': {
      'date': '2018-04-07',
      'timeZone': 'Asia/Saigon',
    },
    'attendees': [
      {'email': 'huy@holistics.io'},
    ]
  };

  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.insert({
    // auth: auth,
    calendarId: 'primary',
    resource: event
  }, (err, event) => {
    if (err) return console.log('The API returned an error: ' + err);

    console.log(event);

  });
}

function holisticsInsertSupportEvent(auth, params) {
  var event = {
    'summary': params.name,
    'start': {
      'date': params.date,
      'timeZone': 'Asia/Saigon',
    },
    'end': {
      'date': params.date,
      'timeZone': 'Asia/Saigon',
    },
    'attendees': [
      {'email': params.email},
    ]
  };

  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.insert({
    // auth: auth,
    calendarId: params.calendarId,
    resource: event
  }, (err, event) => {
    if (err) return console.log('The API returned an error: ' + err);

    console.log(event);

  });
}

function listCalendar(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.calendarList.list({
    // calendarId: 'primary',
    // timeMin: (new Date()).toISOString(),
    maxResults: 10,
    // singleEvents: true,
    // orderBy: 'startTime',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    console.log(data);

    // const events = data.items;
    // if (events.length) {
    //   console.log('Upcoming 10 events:');
    //   events.map((event, i) => {
    //     const start = event.start.dateTime || event.start.date;
    //     console.log(`${start} - ${event.summary}`);
    //   });
    // } else {
    //   console.log('No upcoming events found.');
    // }
  });
}