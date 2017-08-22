module.exports = function(controller) {

  // if this is running on Glitch
  if (process.env.PROJECT_DOMAIN) {

    // Register with studio using the provided domain name
    controller.registerDeployWithStudio(process.env.PROJECT_DOMAIN + '.glitch.me');

  }
}
