var debug = require('debug')('bathroom-status');
var tracker = require('../bathroom_status_tracker');

module.exports = function(webserver, controller) {
    debug('Configured /bathroom_status url');
    webserver.post('/bathroom_status', function(req, res) {
      if (!['occupied', 'available'].includes(req.body.status)) {
        res.status(400);
        res.send(`Invalid status ${req.body.status}. Must be one of [occupied, available].`)
      }

      tracker.updateStatus(req.body.status);

      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({status: tracker.status}));
    });
    webserver.get('/bathroom_status', function(req, res) {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({status: tracker.status}));
    });
}
