/*

Donut Tuesdays controllers for Replicated, Inc.
Contributed by: https://github.com/divolgin

*/

var wordfilter = require('wordfilter');

module.exports = function(controller) {

    controller.hears(['donut', 'doughnut'], 'direct_message,direct_mention,mention', function(bot, message) {

        people = ['dex', 'dmitriy', 'ethan', 'graysonnull', 'jorgeolivero', 'shailie', 'winston'];
        tuesday = nearestTuesday();
        name = people[tuesday.daysSinceEpoch % people.length];
        if (tuesday.daysTilDonuts == 0) {
            bot.reply(message, '@' + name + ' is supposed to bring donuts today!');
        } else {
            bot.reply(message, '@' + name + ' is bringing donuts in ' + tuesday.daysTilDonuts + ' days.');
        }
    });
};

function nearestTuesday() {
    today = new Date();
    today.setHours(12, 0, 0) // use noon to aleviate timezone weirdness.

    curDay = today.getDay();
    // 2 is this week's Tuesday
    // 9 is next week's Tuesday
    if (curDay <= 2) {
      diffDays = 2 - curDay;
    } else {
      diffDays = 9 - curDay;
    }

    var result = new Date(today);
    result.setDate(result.getDate() + diffDays);

    return {
        daysSinceEpoch: Math.round(result / 1000 / 60 / 60 / 24),
        daysTilDonuts: diffDays
    };
}