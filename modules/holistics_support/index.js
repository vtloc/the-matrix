/**
 * GET /
 * Home page.
 */

const express = require('express');
const path = require('path');
const NotificationService = require('../notifications/services');
const LocalNotificationService = require('./service_notifications');

exports.name = "HOLISTICS/SUPPORT"

exports.setup = function(expressApp) {

	// register public folder
	expressApp.use("/holistics_support/public", express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

	// register route
	var route = require('./route');

	expressApp.get("/holistics_support", route.index)
	expressApp.get("/holistics_support/events", route.events)
	expressApp.post("/holistics_support/events", route.createEvent)
	expressApp.get("/holistics_support/notifications", route.get_notifications)

	// register notification trigger to Notifications module

	//
	NotificationService.registerNotificationTrigger(LocalNotificationService.retrieve_notifications)
}