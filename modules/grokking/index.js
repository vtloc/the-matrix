/**
 * GET /
 * Home page.
 */


exports.name = "GROKKING HOME"

exports.setup = function(expressApp) {

	// register route
	expressApp.get("/grokking", require('./route').index)
}