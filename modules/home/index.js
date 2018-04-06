/**
 * GET /
 * Home page.
 */


exports.name = "HOME"

exports.index = require('./route').index

exports.setup = function(expressApp) {

	// register route
	expressApp.get("/", require('./route').index)
}