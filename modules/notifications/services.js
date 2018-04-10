var Datastore = require('nedb')
  , db = {};

db.notifications = new Datastore({ filename: 'modules/notifications/notifications.data' });

var NotificationQueue = [];

exports.insertNotif = (notifParams) => {
  db.notifications.loadDatabase(function (err) {    // Callback is optional
    // try adding demo
    // var demo = {
    //   message: notifParams.message,
    //   timestamp: notifParams.timestamp,
    //   source: notifParams.source,
    //   link: notifParams.link
    // };
    db.notifications.insert([notifParams], function (err) {
      // err is a 'uniqueViolated' error
      // The database was not modified
    });

  });
}

exports.removeNotif = (notifParams) => {

  db.notifications.loadDatabase(function (err) {    // Callback is optional
    // try adding demo
    // var demo = {
    //   id: notifParams.id
    // };
    db.notifications.remove(notifParams, {}, function (err) {

    });

  });
}

exports.registerNotificationTrigger = (triggerFunction) => {
  console.log('notification callback registered');
  NotificationQueue.push(triggerFunction);
}

exports.triggerAllNotifications = (callback) => {
  console.log('there are ', NotificationQueue.length, ' callbacks');
  console.log('queue: ', NotificationQueue);

  for(var i=0; i<NotificationQueue.length; i++) {
    // trigger callback
    NotificationQueue[i](function() {
      console.log('triggered');
    })
  }

  if(callback) callback();
}