/**
 * GET /
 * Home page.
 */

const express = require('express');
const path = require('path');
const NotificationService = require('../notifications/services');
const LocalNotificationService = require('./service_notifications');

exports.name = "Grokking/Research"

exports.setup = function(expressApp) {

	// register public folder
	expressApp.use("/grokking_research/public", express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

	// register route
	var route = require('./route');

	expressApp.get("/grokking_research", route.index)
	expressApp.get("/grokking_research/events", route.events)
	expressApp.post("/grokking_research/events", route.createEvent)

	expressApp.post("/grokking_research/events/:event_id/remove", route.removeEvent)
	// expressApp.get("/grokking_research/notifications", route.get_notifications)

	// register notification trigger to Notifications module

	//
	// NotificationService.registerNotificationTrigger(LocalNotificationService.retrieve_notifications)
}