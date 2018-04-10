const CalendarService = require('./service_gcalendar');
const NotificationService = require('../notifications/services');
const HOLISTICS_SUPPORT_CALENDAR = "holistics.io_mij96drf0tmf3p0pv91pmk7c3s@group.calendar.google.com";


exports.retrieve_notifications = (callback) => {
  console.log('holistics support to retrieve notification triggered');

  var param = {
    calendarId: HOLISTICS_SUPPORT_CALENDAR, // holistic company calendar
    query: "Support"
  }

  CalendarService.loadGoogleCalendarEvents(param, function(events) {
    if(!events) return callback([]);
    if(events.length <= 0) return callback([]);

    if(events.length < 10) {
      var notif = {
        "source" : "holistics_support",
        "_id": "holistics_support_daily_check",
        "message": "There is less than 10 events within the support",
        "timestamp": new Date(),
        "link": "holistics_support"
      }

      NotificationService.insertNotif(notif);

      return callback([notif]);
    }
    else {
      console.log('should remove notif')
      NotificationService.removeNotif({_id: "holistics_support_daily_check"})

      return callback([]);
    }
  });
}
