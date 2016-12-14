module.exports = function(controller) {

    // Dashbot is a turnkey analytics platform for bots.
    // Sign up for a free key here: https://www.dashbot.io/ to see your bot analytics in real time.
    if (process.env.DASHBOT_API_KEY) {
      var dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).slack;
      controller.middleware.receive.use(dashbot.receive);
      controller.middleware.send.use(dashbot.send);
      controller.log.info('Thanks for using Dashbot. Visit https://www.dashbot.io/ to see your bot analytics in real time.');
    } else {
      controller.log.info('No DASHBOT_API_KEY specified. For free turnkey analytics for your bot, go to https://www.dashbot.io/ to get your key.');
    }

}
