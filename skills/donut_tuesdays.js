/*

Donut Tuesdays controllers for Replicated, Inc.
Contributed by: https://github.com/divolgin

*/

module.exports = function(controller) {

    controller.hears(['donut', 'doughnut'], 'direct_message,direct_mention,mention', function(bot, message) {

        people = ['ethan', 'dmitriy', 'graysonnull', 'dex', 'shailie', 'winston'];
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

    if(now.weekday() < 2) {
        nextDonutDay = now.diff(now.weekday("Tuesday"), 'days')
    } else {
        nextDonutDay = now.add(1, 'week').day("Tuesday");
    }

    diffDays = moment(nextDonutDay).diff(now, 'days');

    return {
        daysSinceWinston: moment([2016, 10, 17]).diff(now, 'days'),
        daysTilDonuts: diffDays,
    };
}