module.exports = function(controller) {

    // create special handlers for certain actions in buttons
    // if the button action is 'action', trigger an event
    // if the button action is 'say', act as if user said that thing
    controller.on('interactive_message_callback', function(bot, trigger) {


        if (trigger.actions[0].name.match(/^action$/)) {
            controller.trigger(trigger.actions[0].value, [bot, trigger]);
            return false; // do not bubble event
        }
        if (trigger.actions[0].name.match(/^say$/)) {

            var message = {
                user: trigger.user,
                channel: trigger.channel,
                text: '<@' + bot.identity.id + '> ' + trigger.actions[0].value,
                type: 'message',
            };

            var reply = trigger.original_message;

            for (var a = 0; a < reply.attachments.length; a++) {
                reply.attachments[a].actions = null;
            }

            var person = '<@' + trigger.user.id + '>';
            if (message.channel[0] == 'D') {
                person = 'You';
            }

            reply.attachments.push(
                {
                    text: person + ' said, ' + trigger.actions[0].value,
                }
            );

            bot.replyInteractive(trigger, reply);

            controller.receiveMessage(bot, message);
            return false; // do not bubble event
        }

    });


}
