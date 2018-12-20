var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('onboard', function(bot) {
        debug('Starting an onboarding experience!');
        bot.startPrivateConversation({user: bot.config.createdBy},function(err,convo) {
            if (err) {
            console.log(err);
            } else {
            convo.say('I am a bot that has just joined your team');
            convo.say('You must now /invite me to a channel so that I can be of use!');
            }
        });
    });

}
