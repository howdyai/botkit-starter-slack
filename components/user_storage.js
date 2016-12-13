var debug = require('debug')('botkit:user_storage');

module.exports = function(controller) {

    controller.on('oauth:success', function(payload) {

        debug('Got a successful login!', payload);


    });


}
