module.exports = function(controller) {

  // tutorial functions
  var getDailySpecial = function(){
    var special = {
      name: 'Tom Kha Gai',
      description: 'Made with coconut milk, galangal, lemon grass and chicken. The fried chillies add a smoky flavor as well as texture, color and heat, but not so much that it overwhelms the soup.',
      price: '4.00'
    };
    return special;

  };

  var getMenu = function(){
    var menu = [
      {
        name: 'Borscht',
        description: 'The strong red coloured vegetable soup from Eastern Europe that includes beet roots as it’s main.',
        price: '5.00'
      },
      {
        name: 'Broccoli Cheese',
        description: 'The perfect broccoli cheese soup is thick, creamy, and cheesy.',
        price: '5.00'
      },
      {
        name: 'Chicken Soup',
        description: 'The world’s most famous soup made from chicken, simmered in water, usually with various other ingredients.',
        price: '5.00'
      },
      {
        name: 'Clam Chowder',
        description: 'A New England soup that contains clams with potatoes, onions and bacon. When done right, clam chowder should be rich and filling, but not sludgy or stew-like.',
        price: '5.00'
      },
      {
        name: 'Egg Drop',
        description: 'A Chinese soup of beaten eggs, chicken broth, and boiled water. Condiments such as table salt, black pepper, and green onion are also commonly added.',
        price: '5.00'
      }    ];
    return menu;
  };


    controller.studio.before('example_soupme', function(convo, next){
      // get soup of the day
      var daily_special = getDailySpecial();
      convo.setVar('daily_special', daily_special);
      // get soup options
      var soup_menu = getMenu();
      convo.setVar('soup_menu', soup_menu);
      // cleanse the pallet
      convo.setVar('soup_selection', null);
      convo.setVar('selected_soup_size', null);
      next();
    });

    controller.studio.validate('example_soupme','selected_soup', function(convo, next) {
      var found_soup = [], possible_matches = [], soup_selection, input = convo.extractResponse('selected_soup');
      possible_matches.push(convo.vars.daily_special.name);
      convo.vars.soup_menu.forEach(function(m){
        possible_matches.push(m.name);
      });
      possible_matches.forEach(function(pm){
        var re = new RegExp('^' + input.toLowerCase() + '\\b' , 'igm');
        var found = pm.match(re);
        if(found){
          found_soup = convo.vars.soup_menu.filter(function(s){
            return s.name.toLowerCase() === pm.toLowerCase();
          });
          if(found_soup.length === 0){
            console.log(convo.vars.daily_special.name.toLowerCase(), '|', pm.toLowerCase());
            if(convo.vars.daily_special.name.toLowerCase() === pm.toLowerCase()){
              found_soup = [];
              found_soup.push(convo.vars.daily_special);
            }
          }
        }
      });
      if(found_soup.length > 0) {
        convo.setVar('soup_selection', found_soup[0]);
        convo.changeTopic('soup_selected');
      }else {
        convo.changeTopic('invalid_soup');
      }
      next();
    });

    controller.studio.validate('example_soupme','soup_size', function(convo, next) {
      var selected_soup_size, valid_sizes = ['small', 'medium', 'epic'], input = convo.extractResponse('soup_size');
      console.log('soup_size: ', input);
      var filtered_input = valid_sizes.filter(function(s){
        return s.toLowerCase() === input.toLowerCase();
      });
      if(filtered_input.length === 0){
        convo.changeTopic('invalid_size');
      }else if (filtered_input.length > 1) {
        convo.changeTopic('ambiguous_size');
      }else {
        selected_soup_size = filtered_input[0];
        convo.setVar('selected_soup_size', selected_soup_size);
        convo.setVar('order_confirmation', '123');
        convo.changeTopic('soup_order_complete');
      }
      next();
    });



    controller.studio.after('example_soupme', function(convo, next) {
      if (convo.status == 'completed' && convo.vars.soup_selection && convo.vars.selected_soup_size) {
        console.log('--------------------------- soup order finished ----------------------------------');
        console.log('Generated a soup order for', convo.context.user, ' who ordered a', convo.vars.selected_soup_size, ' sized ', convo.vars.soup_selection.name, ' with a confirmation number of ', convo.vars.order_confirmation);
        console.log('Get started with the soup!');
        next();
      }else {
        next();
      }

    });
};
