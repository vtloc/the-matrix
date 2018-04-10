/**
 * GET /
 * Home page.
 */

const express = require('express');
const path = require('path');

exports.name = "HOLISTICS RECRUITMENT"

exports.setup = function(expressApp) {
	expressApp.use("/holistics_recruitment/public", express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
	// register route
	expressApp.get("/holistics_recruitment", require('./route').index)
	expressApp.get("/holistics_recruitment/events", require('./route').events)
}