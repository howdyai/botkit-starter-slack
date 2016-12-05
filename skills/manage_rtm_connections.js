module.exports = function(controller) {

    // just a simple way to make sure we don't
    // connect to the RTM twice for the same team
    var _bots = {};
    function trackBot(bot) {
      _bots[bot.config.token] = bot;
    }


    // when a new team joins and a bot gets created
    // trigger an onboarding
    controller.on('create_bot',function(bot,config) {

      if (_bots[bot.config.token]) {
        // already online! do nothing.
      } else {
        bot.startRTM(function(err) {

          if (!err) {
            trackBot(bot);
          }

          bot.startPrivateConversation({user: config.createdBy},function(err,convo) {
            if (err) {
              console.log(err);
            } else {
              convo.say('I am a bot that has just joined your team');
              convo.say('You must now /invite me to a channel so that I can be of use!');
            }
          });

        });
      }

    });


    // when the app starts, load all existing teams and connect them to the API
    controller.storage.teams.all(function(err,teams) {

      if (err) {
        throw new Error(err);
      }

      // connect all teams with bots up to slack!
      for (var t  in teams) {
        if (teams[t].bot) {
          controller.spawn(teams[t]).startRTM(function(err, bot) {
            if (err) {
              console.log('Error connecting bot to Slack:',err);
            } else {
              trackBot(bot);
            }
          });
        }
      }

    });


}
