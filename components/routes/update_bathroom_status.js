var debug = require('debug')('bathroom-status');

module.exports = function(webserver, controller) {
    debug('Configured /bathroom_status url');
    webserver.post('/bathroom_status', function(req, res) {
        // respond to Slack that the webhook has been received.
        res.status(200);
        res.send('Got ' + JSON.stringify(req.body, null, 4));
    });

}
