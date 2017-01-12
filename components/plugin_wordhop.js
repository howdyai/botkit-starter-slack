module.exports = function(controller) {

    // Wordhop provides a toolkit to monitor bots for problems and take over live
    // Visit https://www.wordhop.io/ to add Wordhop to Slack and start getting alerts.
    if (process.env.wordhop_api_key && process.env.wordhop_client_key) {
      var wordhop = require('wordhop')(process.env.wordhop_api_key, process.env.wordhop_client_key, {platform:'slack'});
      controller.wordhop = wordhop;
      // Add the wordhop middleware 
      controller.middleware.receive.use(wordhop.receive); 
      controller.middleware.send.use(wordhop.send);
      // Handle forwarding the messages sent by a human through your bot
      wordhop.on('chat response', function (message) {
          bot.say(message);
      });
      
      controller.log.info('Thanks for using Wordhop.');
    } else {
      controller.log.info('No wordhop_api_key or wordhop_client_key specified. To monitor your bots For problems & take over live, go to https://www.wordhop.io/ to get your keys.');
    }
}