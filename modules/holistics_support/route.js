const path = require('path');

const CalendarService = require('../google_services/gcalendar');
const LocalNotificationService = require('./service_notifications');

const HOLISTICS_SUPPORT_CALENDAR = "holistics.io_mij96drf0tmf3p0pv91pmk7c3s@group.calendar.google.com";


exports.index = (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));

  LocalNotificationService.retrieve_notifications(function(){});
};

exports.events = (req, res) => {
  var query = req.query.q;

  // Load client secrets from a local file.
  var param = {
    calendarId: HOLISTICS_SUPPORT_CALENDAR, // holistic company calendar
    query: req.query.q
  }

  CalendarService.loadGoogleCalendarEvents(param, function(events) {
    res.send(JSON.stringify(events));
  });
}

exports.createEvent = (req, res) => {
  var params = {
    calendarId: HOLISTICS_SUPPORT_CALENDAR,
    date: req.body.date,
    name: req.body.description,
    email: req.body.email 
  }

  CalendarService.createCalendarEvent(params, function() {
    res.send(JSON.stringify({"status": "ok"}));
  });

}

exports.get_notifications = (req, res) => {

  LocalNotificationService.retrieve_notifications(function(notifs) {
    res.send(JSON.stringify({"notifications": notifs}));
  });
}

