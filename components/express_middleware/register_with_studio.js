var request = require('request');
var debug = require('debug')('botkit:register_with_studio');
module.exports = function(webserver, controller) {

    var registered_this_session = false;

    controller.registerDeployWithStudio = function(host) {
            if (!registered_this_session && controller.config.studio_token) {

                // information about this instance of Botkit
                // send to Botkit Studio in order to display in the hosting tab
                var instance = {
                    url: host,
                    version: controller.version(),
                    ts: new Date(),
                }

                request({
                    method: 'post',
                    uri: (controller.config.studio_command_uri || 'https://studio.botkit.ai') + '/api/v1/bots/phonehome?access_token=' + controller.config.studio_token,
                    form: instance,
                },function(err, res, body) {

                    registered_this_session = true;

                    if (err) {
                        debug('Error registering instance with Botkit Studio', err);
                    } else {

                        var json =null;
                        try {
                            json = JSON.parse(body);
                        } catch(err) {
                            debug('Error registering instance with Botkit Studio', err);
                        }

                        if (json) {
                            if (json.error) {
                                debug('Error registering instance with Botkit Studio', json.error);
                            }
                        }
                    }

                });

            }
    }


    if (webserver && controller.config.studio_token) {
        webserver.use(function(req, res, next) {
            controller.registerDeployWithStudio(req.get('host'));
            next();
        });

    }

}
