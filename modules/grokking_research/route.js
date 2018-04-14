const path = require('path');

const CalendarService = require('../google_services/gcalendar');
const LocalNotificationService = require('./service_notifications');

var Datastore = require('nedb')
  , db = {};

db.events = new Datastore({ filename: 'modules/grokking_research/events.data' });


exports.index = (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));

  // LocalNotificationService.retrieve_notifications(function(){});
};

exports.events = (req, res) => {
  var query = req.query.q;

  db.events.loadDatabase(function (err) {    // Callback is optional
    if(err)
      console.log(err);

    db.events.find({}, function(err, docs) {
      if(err)
        console.log(err);

      console.log('Loaded events from database ', docs);

      res.send(JSON.stringify({events: docs}));
    });
  });
}

exports.createEvent = (req, res) => {

  db.events.loadDatabase(function (err) {    // Callback is optional
    var data = {
      member: req.body.member,
      topic: req.body.topic,
      date: req.body.date
    };

    db.events.insert([data], function (err) {
      res.send('ok');
    });

  });
}

exports.removeEvent = (req, res) => {
  console.log('remove event: ', req.params.event_id);
  db.events.loadDatabase(function (err) {    // Callback is optional
    var data = {
      member: req.body.member,
      topic: req.body.topic,
      date: req.body.date
    };

    db.events.remove({_id: req.params.event_id}, {}, function (err) {
      res.send('ok');
    });

  });
}
