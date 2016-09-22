/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Get a Botkit Studio token from Botkit.ai:

    -> https://studio.botkit.ai/

  Run your bot from the command line:

    token=<MY SLACK TOKEN> studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Botkit = require('botkit');

if (!process.env.token) {
    console.log('Error: Specify a Slack bot token in environment.');
    usage_tip();
    process.exit(1);
}

if (!process.env.studio_token) {
    console.log('Error: Specify a Botkit Studio token in environment.');
    usage_tip();
    process.exit(1);
}

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot({
    debug: false,
    studio_token: process.env.studio_token
});

// Spawn a single instance of the bot to connect to your Slack team
// You can extend this bot later to connect to multiple teams.
// Refer to the Botkit docs on Github
var bot = controller.spawn({
    token: process.env.token,
}).startRTM();


var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});


// This captures and evaluates any message sent to the bot as a DM
// or sent to the bot in the form "@bot message" and passes it to
// Botkit Studio to evaluate for trigger words and patterns.
// If a trigger is matched, the conversation will automatically fire!
// You can tie into the execution of the script using the functions
// controller.studio.before, controller.studio.after and controller.studio.validate
controller.on('direct_message,direct_mention,mention', function(bot, message) {
    controller.studio.runTrigger(bot, message.text, message.user, message.channel).catch(function(err) {
        bot.reply(message, 'I experienced an error with a request to Botkit Studio: ' + err);
    });
});


function usage_tip() {
    console.log('~~~~~~~~~~');
    console.log('Botkit Studio Starter Kit');
    console.log('Execute your bot application like this:');
    console.log('token=<MY SLACK TOKEN> studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js');
    console.log('Get a Slack token here: https://my.slack.com/apps/new/A0F7YS25R-bots')
    console.log('Get a Botkit Studio token here: https://studio.botkit.ai/')
    console.log('~~~~~~~~~~');
}
