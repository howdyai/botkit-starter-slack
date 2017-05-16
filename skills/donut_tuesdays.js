/*

Donut Tuesdays controllers for Replicated, Inc.
Contributed by: https://github.com/divolgin

*/

module.exports = function(controller) {

    controller.hears(['donut', 'doughnut'], 'direct_message,direct_mention,mention', function(bot, message) {

        people = ['dex', 'dmitriy', 'ethan', 'graysonnull', 'shailie', 'winston'];
        tuesday = nearestTuesday();
        name = people[tuesday.daysSinceWinston % people.length];
        if (tuesday.daysTilDonuts == 0) {
            bot.reply(message, '@' + name + ' is supposed to bring donuts today!');
        } else {
            bot.reply(message, '@' + name + ' is bringing donuts in ' + tuesday.daysTilDonuts + ' day(s).');
        }
    });
};

function nearestTuesday() {
    var moment = require('moment');
    var now = moment();

    if(now.weekday() <= 2) {
        nextDonutDay = now.clone().isoWeekday("Tuesday");
    } else {
        nextDonutDay = now.clone().add(1, 'week').isoWeekday("Tuesday");
    }

    diffDays = nextDonutDay.date() - now.date();

    return {
        daysSinceWinston: Math.abs(moment("10-17-2016", "MM-DD-YYYY").diff(nextDonutDay, 'days')),
        daysTilDonuts: diffDays,
    };
}