/*

WHAT IS THIS?

*/

module.exports = function(controller) {

    controller.hears(['lol'], 'direct_message,direct_mention', function(bot, message) {
        controller.studio.run(bot, 'lol', message.user, message.channel);
    });

    controller.studio.before('lol', function(convo, next) {
        // do something before this happens
        // could load data into convo using convo.setVar

        // make sure to call next to continue executing script!
        next();
    });

    controller.studio.after('lol', function(convo, next) {
        // do something after this happens

        // make sure to call next to continue executing script!
        next();
    });


};
