/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

module.exports = function(controller) {

    controller.hears(['cheese'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {

            // create a path for when a user says YES
            convo.addMessage({
                    text: 'You said yes! How wonderful.',
            },'yes_thread');

            // create a path for when a user says NO
            convo.addMessage({
                text: 'You said no, that is too bad.',
            },'no_thread');

            // create a path where neither option was matched
            // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
            convo.addMessage({
                text: 'Sorry I did not understand.',
                action: 'default',
            },'bad_response');

            // Create a yes/no question in the default thread...
            convo.ask('Do you like cheese?', [
                {
                    pattern: 'yes',
                    callback: function(response, convo) {
                        convo.changeTopic('yes_thread');
                    },
                },
                {
                    pattern: 'no',
                    callback: function(response, convo) {
                        convo.changeTopic('no_thread');
                    },
                },
                {
                    default: true,
                    callback: function(response, convo) {
                        convo.changeTopic('bad_response');
                    },
                }
            ]);

            convo.activate();
        });

    });

};
