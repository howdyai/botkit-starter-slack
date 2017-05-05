/*

Miscellaneous controllers for Replicated, Inc.

*/

module.exports = function(controller) {

    controller.hears('winston',['direct_message,direct_mention,mention'], function(bot, message) {

        bot.reply(message,':heart_eyes:');
    });
};
