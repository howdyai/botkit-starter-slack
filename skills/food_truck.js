/*

Food truck controllers for Replicated, Inc.

*/

module.exports = function(controller) {

    controller.hears(['food', 'hungry', 'lunch', 'truck'], 'direct_message,direct_mention,mention', function(bot, message) {

        controller.storage.users.get(message.user, function(err, user) {
            var Twit = require('twit');
            var T = new Twit({
            consumer_key:         process.env.CONSUMER_KEY
            , consumer_secret:      process.env.CONSUMER_SECRET
            , access_token:         process.env.ACCESS_TOKEN
            , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
            })
            T.get('statuses/user_timeline', { count:20, since_id: todaysDate(), trim_user: true, exclude_replies: true, user_id: 2295568387 }, function(err, data, response) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].text.indexOf('@bLAckwelder_LA') != -1){
                        bot.reply(message, 'Hello, today\'s food truck tweet is: ' + data[i].text);
                    } else {
                        bot.reply(message, 'Sorry! Don\'t know what the food truck is today, so better start walking!');
                    }
                }
            })
        });
    });

    controller.hears(['expensive', 'how much', 'cost', 'price'], 'direct_message,direct_mention,mention', function(bot, message) {

        bot.reply(message,'If you have to ask, you can\'t afford it');
    });


};
