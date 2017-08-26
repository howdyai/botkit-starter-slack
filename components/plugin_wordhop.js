module.exports = function(controller) {

    // Wordhop provides a toolkit to monitor bots for problems and take over live
    // Visit https://www.wordhop.io/ to add Wordhop to Slack and start getting alerts.
    if (process.env.wordhop_api_key && process.env.wordhop_client_key) {
      var wordhop = require('wordhop')(process.env.wordhop_api_key, process.env.wordhop_client_key, {platform:'slack'});
      controller.wordhop = wordhop;
      // Add the wordhop middleware 
      controller.middleware.receive.use(wordhop.receive); 
      controller.middleware.send.use(wordhop.send);
      // Handle forwarding the messages sent by a human through your bot
      wordhop.on('chat response', function (message) {   
          var team_id = message.team || null;
          controller.findTeamById(team_id, function(err, team) {
              if (err) {
                  controller.log.error('Could not load team while processing webhook: ', err);
                  return;
              } else if (!team) {
                  // if this is NOT a slack app, it is ok to spawn a generic bot
                  // this is only likely to happen with custom slash commands
                  return
              } else {
                  // spawn a bot
                  var bot = controller.spawn(team);
  
                  // Identify the bot from either team storage or identifyBot()
                  bot.team_info = team;
                  bot.identity = {
                      id: team.bot.user_id,
                      name: team.bot.name
                  };
                  bot.say(message);
              }
          });
      });
      
      controller.log.info('Thanks for using Wordhop.');
    } else {
      controller.log.info('No wordhop_api_key or wordhop_client_key specified. To monitor your bots For problems & take over live, go to https://www.wordhop.io/ to get your keys.');
    }
}
