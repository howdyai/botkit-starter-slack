var request = require('request');
module.exports = function(controller) {

  function keepalive() {

    request({
      url: 'http://' + process.env.PROJECT_DOMAIN + '.glitch.me',
    }, function(err) {

      setTimeout(function() {
        keepalive();
      }, 55000);

    });

  }

  // if this is running on Glitch
  if (process.env.PROJECT_DOMAIN) {

    // Register with studio using the provided domain name
    controller.registerDeployWithStudio(process.env.PROJECT_DOMAIN + '.glitch.me');

    // make a web call to self every 55 seconds
    // in order to avoid the process being put to sleep.
    keepalive();

  }
}
