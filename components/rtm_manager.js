var debug = require('debug')('botkit:rtm_manager');

module.exports = function(controller) {

    var managed_bots = {};

    // Capture the rtm:start event and actually start the RTM...
    controller.on('rtm:start', function(config) {
        var bot = controller.spawn(config);
        manager.start(bot);
    });

    //
    controller.on('rtm_close', function(bot) {
        manager.remove(bot);
    });

    // The manager object exposes some useful tools for managing the RTM
    var manager = {
        start: function(bot) {

            if (managed_bots[bot.config.token]) {
                debug('Start RTM: already online');
            } else {
                bot.startRTM(function(err, bot) {
                    if (err) {
                        debug('Error starting RTM:', err);
                    } else {
                        managed_bots[bot.config.token] = bot.rtm;
                        debug('Start RTM: Success');
                    }
                });
            }
        },
        stop: function(bot) {
            if (managed_bots[bot.config.token]) {
                if (managed_bots[bot.config.token].rtm) {
                    debug('Stop RTM: Stopping bot');
                    managed_bots[bot.config.token].closeRTM()
                }
            }
        },
        remove: function(bot) {
            debug('Removing bot from manager');
            delete managed_bots[bot.config.token];
        },
        reconnect: function() {

            debug('Reconnecting all existing bots...');
            controller.storage.teams.all(function(err, list) {

                if (err) {
                    throw new Error('Error: Could not load existing bots:', err);
                } else {
                    for (var l = 0; l < list.length; l++) {
                        manager.start(controller.spawn(list[l].bot));
                    }
                }

            });

        }
    }


    return manager;

}
