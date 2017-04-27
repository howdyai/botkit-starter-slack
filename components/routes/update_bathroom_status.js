var debug = require('debug')('bathroom-status');
var tracker = require('../bathroom_status_tracker');

module.exports = function(webserver, controller) {
    //
    var io = require('socket.io')(controller.httpserver);
    //

    debug('Configured /bathroom_status url');
    webserver.post('/bathroom_status', function(req, res) {
      if (!['occupied', 'available'].includes(req.body.status)) {
        res.status(400);
        res.send(`Invalid status ${req.body.status}. Must be one of [occupied, available].`)
      }

      const statusChanged = tracker.updateStatus(req.body.status);
      if (statusChanged) {
        // Notify websockets
        io.emit('statusChange', tracker.status)
      }

      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({status: tracker.status}));
    });
    webserver.get('/bathroom_status', function(req, res) {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({status: tracker.status}));
    });

    webserver.get('/status', function(req, res) {
      res.status(200);
      res.setHeader('Content-Type', 'text/html');
      res.send(`
<html>
  <head>
    <style type="text/css">
      body {
        margin: 0;
        font-size: 80px;
        font-weight: bold;
        display: table;
        height: 100%;
        width: 100%;
        text-align: center;
      }
      .status-available {
        // display: table-cell;
        background-color: green;
        vertical-align: middle;
      }
      .status-occupied {
        // display: table-cell;
        background-color: red;
        vertical-align: middle;
      }
    </style>
    <script>
    window.ButtonWebConfig = {
      applicationId: 'app-6f970e3b80d2a128'
    };
    (function(u,s,e,b,t,n){
      u['__bttnio']=b;u[b]=u[b]||function(){(u[b].q=u[b].q||[]).push(arguments)};t=s.createElement(e);n=s.getElementsByTagName(e)[0];t.async=1;t.src='https://web.btncdn.com/v1/button.js';n.parentNode.insertBefore(t,n)
    })(window, document, 'script', 'bttnio');
    </script>
  </head>
  <body>
    <div class="status-${tracker.status}" id="status-color">The bathroom is ${tracker.status}</div>
    <div data-bttnio-id="btn-3dda0c43216b8e3c" data-bttnio-context='{ "subject_location": { "latitude": 40.738275, "longitude": -73.982285 } }'></div>
    <div data-bttnio-id="btn-2d12cd4e16414ef1" data-bttnio-context='{ "item": { "identifiers": { "jet": "9a04cd1ee78d403aa3aa3d220e077339" } } }'></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js"></script>
    <script>
      var socket = io();
      socket.on('statusChange', function(data) {
        console.log(data);
        var div = document.getElementById( 'status-color' );
        var message = "The bathroom is " + data;
        if (data == "occupied") {
          var color = "red";
        } else if (data == "available") {
          var color = "green";
        } else {
          var color = "yellow"
          var message = "Something funky is going on with the sensor..."
        }
        div.style.backgroundColor = color;
        div.innerHTML = message;
      });
    </script>
  </body>

</html>
`)
    });
}
