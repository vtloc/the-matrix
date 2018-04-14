/**
 * GET /
 * Home page.
 */


exports.name = "SLACK"

exports.setup = function(expressApp) {

	// register route
	expressApp.post("/slack/incoming_events", require('./route').incoming_events);
	expressApp.post("/slack/send_message", require('./route').send_message);
}