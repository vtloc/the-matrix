const path = require('path');

const CalendarService = require('../google_services/gcalendar');
const LocalNotificationService = require('./service_notifications');
const NotificationService = require('../notifications/services');

const RECRUITMENT_CALENDAR = "loc.vo@holistics.io";


exports.index = (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));

  LocalNotificationService.retrieve_notifications(function(){});
};

exports.events = (req, res) => {
  var query = req.query.q;

  // Load client secrets from a local file.
  var param = {
    calendarId: RECRUITMENT_CALENDAR, // holistic company calendar
    query: req.query.q
  }

  CalendarService.loadGoogleCalendarEvents(param, function(events) {
    res.send(JSON.stringify(events));
  });
}

exports.get_notifications = (req, res) => {

  LocalNotificationService.retrieve_notifications(function(notifs) {
    res.send(JSON.stringify({"notifications": notifs}));
  });
}

