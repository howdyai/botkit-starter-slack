var debug = require('debug')('bathroom-status-skill');
const tracker = require('../components/bathroom_status_tracker');

module.exports = function(controller) {
  debug('Bathroom status skills gained!');

  controller.hears(['^status'], 'direct_message,direct_mention', function(bot, message) {
    debug('Heard bathroom status request');
    bot.reply(message, `The bathroom is ${tracker.status}`);
  });

  controller.hears(['^notify'], 'direct_message,direct_mention', function(bot, message) {
    debug('Heard bathroom notify request');
    if (tracker.status === 'available') {
      bot.reply(message, 'The bathroom is available.');
    } else {
      bot.reply(message, 'OK! I will tell you when the bathroom is available');
      tracker.subscribe(bot, message);
    }
  });
}