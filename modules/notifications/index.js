/**
 * GET /
 * Home page.
 */

const express = require('express');
const path = require('path');

exports.name = "NOTIFICATIONS"

exports.setup = function(expressApp) {

	// register public folder
	expressApp.use("/notifications/public", express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

	// register route
	var route = require('./route');

	expressApp.get("/notifications", route.index)
	expressApp.get("/notifications/list", route.listAll)
	expressApp.get("/notifications/trigger_all", route.triggerAllNotifications)
	// register worker
}