class BathroomStatusTracker {
  constructor(controller) {
    this.status = 'available';
    this.controller = controller;
    this.subscribed = new Map();
  }

  updateStatus(status) {
    const oldStatus = this.status;
    this.status = status;
    if (oldStatus != this.status) {
      this.subscribed.forEach((bot, user) => {

      });
    }
  }

  subscribe(bot, user) {
    this.subscribed[user] = bot;
  }
}