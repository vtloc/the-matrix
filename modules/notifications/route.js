const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const readline = require('readline');
const _ = require('lodash');

const Service = require('./services')

var Datastore = require('nedb')
  , db = {};

db.notifications = new Datastore({ filename: 'modules/notifications/notifications.data' });


exports.index = (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
};

exports.listAll = (req, res) => {
  var query = req.query.q;

  db.notifications.loadDatabase(function (err) {    // Callback is optional
    db.notifications.find({}, function(err, docs) {
      // console.log('Loaded notifications from database');

      res.send(JSON.stringify({notifications: docs}));
    });
  });
}

exports.triggerAllNotifications = (req, res) => {
  Service.triggerAllNotifications(function() {
    res.send(JSON.stringify({status: "ok"}));
  })
}

