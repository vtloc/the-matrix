/**
 * GET /
 * Home page.
 */


exports.name = "Grokking/Home"

exports.setup = function(expressApp) {

	// register route
	expressApp.get("/grokking", require('./route').index)
}