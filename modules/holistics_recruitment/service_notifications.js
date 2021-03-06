const CalendarService = require('../google_services/gcalendar');
const NotificationService = require('../notifications/services');
const RECRUITMENT_CALENDAR = "holistics.io_mij96drf0tmf3p0pv91pmk7c3s@group.calendar.google.com";


exports.retrieve_notifications = (callback) => {
  console.log('holistics support to retrieve notification triggered');

  var param = {
    calendarId: RECRUITMENT_CALENDAR, // holistic company calendar
    query: "Interview"
  }

  CalendarService.loadGoogleCalendarEvents(param, function(events) {
    if(!events) return callback([]);
    if(events.length <= 0) return callback([]);

    return callback([]);

    // if(events.length < 10) {
    //   var notif = {
    //     "source" : "holistics_support",
    //     "_id": "holistics_support_daily_check",
    //     "message": "There is less than 10 events within the support",
    //     "timestamp": new Date(),
    //     "link": "holistics_support"
    //   }

    //   NotificationService.insertNotif(notif);

    //   return callback([notif]);
    // }
    // else {
    //   console.log('should remove notif')
    //   NotificationService.removeNotif({_id: "holistics_support_daily_check"})

    //   return callback([]);
    // }
  });
}
