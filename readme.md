# Botkit Studio Starter Kit

This repo contains everything you need to get started building a bot with Botkit Studio!

[Botkit Studio](https://studio.botkit.ai/) is a set tools that adds capabilities
to the open source Botkit library by offering hosted GUI interfaces for script
management and action trigger definition. Botkit Studio is built by the company
that created and maintains the open source Botkit library, [Howdy.](https://howdy.ai)

### Get Started

Clone this repository:

`git clone git@github.com:howdyai/botkit-studio-starter.git`

Install dependencies, including [Botkit](https://github.com/howdyai/botkit):

```
cd botkit-studio-starter
npm install
```

Get a Slack bot token [from your Slack team](https://my.slack.com/apps/new/A0F7YS25R-bots)

Get a Botkit Studio token [from your Botkit developer account](https://studio.botkit.ai/)

Run your bot from the command line with your new tokens:

`token=<slack token> studio_token=<botkit studio token> node .`

Your bot should connect to Slack AND Botkit Studio and leap into action!

Continue your journey to becoming a champion botmaster by [reading the Botkit Studio SDK documentation here.](https://github.com/howdyai/botkit/blob/talkabot/readme-studio.md)

### Extend This Bot

This repo is designed to provide developers a robust starting point for building a custom bot. Included in the code are a set of sample bot "skills" that illustrate various aspects of the Botkit SDK features.  Once you are familiar with how Botkit works, you may safely delete all of the files in the `skills/` subfolder.

Developers will build custom features as modules that live in the `skills/` folder. The main bot application will automatically include any files placed there.

A skill module should be in the format:

```
module.exports = function(controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

}
```
