/*

Miscellaneous controllers for Replicated, Inc.

*/

module.exports = function(controller) {

    controller.on(['direct_message', 'direct_mention', 'mention'], function(bot,message) {

        if (/[а-яА-ЯЁё]/.test(message.text)) {
            bot.reply(message, 'Здравствуйте Дмитрий');
        } else {
            bot.reply(message, 'I don\'t have a response, submit a PR!');
            bot.reply(message, 'https://github.com/wlaoh/botkit-starter-slack');
        }
    });

    controller.hears('winston',['direct_message,direct_mention,mention'], function(bot, message) {

        bot.reply(message,':heart_eyes:');
    });
};
