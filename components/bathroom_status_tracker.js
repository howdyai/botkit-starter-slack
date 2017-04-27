var debug = require('debug')('bathroom-status-tracker');

class BathroomStatusTracker {
  constructor(controller) {
    this.status = 'available';
    this.controller = controller;
    this.subscribed = new Map();
  }

  updateStatus(status) {
    const oldStatus = this.status;
    this.status = status;
    if (oldStatus != this.status && this.status === 'available') {
      debug('Bathroom now available. Notifying every subscriber');
      this.subscribed.forEach(({bot, message}) => {
        debug(`Notifying ${message.user.userId}`);
        bot.reply(message, 'The bathroom is available!');
      });
    }
    if (oldStatus != this.status) {
      return true;
    }
  }

  subscribe(bot, message) {
    debug(`userId ${message.user} has subscribed.`);
    this.subscribed.set(message.user, { bot, message });
  }
}

module.exports = new BathroomStatusTracker();
