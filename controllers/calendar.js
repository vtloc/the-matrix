/**
 * GET /calendar/oauth_callback
 * 
 */
exports.oauth_callback = (req, res) => {
 console.log(req);

 res.send('ok');
};
