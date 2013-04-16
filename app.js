var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Ember.Handlebars.registerBoundHelper('inc', function(value){ return value + 1 });

App.Router.map(function(){
  this.resource('categories', function(){
    this.resource('category', {path:':category_id'}, function(){
      this.resource('factoid', {path:'factoid/:factoid_id/'});
    });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect:function(){
    this.transitionTo('categories');
  },
});

App.CategoriesRoute = Ember.Route.extend({
 model:function(){
    return App.Category.find();
  }
});

App.CategoryRoute = Ember.Route.extend({
  setupController: function(controller){
    controller.set('carouselPosition', 0);
  }
});

App.CategoriesController = Ember.ArrayController.extend({sortProperties:['id'], sortAscending:false});

App.CategoryController = Ember.ObjectController.extend({
  carouselPosition: null,
  prettyPos: this.carouselPosition,
  prevFactoid:function(){ 
    if(this.carouselPosition !== 0){
      this.decrementProperty('carouselPosition');
      $(".panes").css("margin-left", -(this.carouselPosition * 100) + "%"); 
    }else { }
  },
  nextFactoid:function(){ 
    console.log(this.carouselPosition);
    if(this.carouselPosition < (this.get('factoids.content').length - 1)){
      this.incrementProperty('carouselPosition');
      $(".panes").css("margin-left", -(this.carouselPosition * 100) + "%"); 
    } else { }
  },
});

App.Adapter = DS.FixtureAdapter.create({});

DS.FixtureAdapter.configure("plurals", { category: "categories" } );

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'App.Adapter'
});

App.Category = DS.Model.extend({
  name: DS.attr('string'),
  factoids: DS.hasMany('App.Factoid')
});

App.Factoid = DS.Model.extend({
  category: DS.belongsTo('App.Category'),
  text: DS.attr('string')
});

App.Category.FIXTURES = [{
  id:1,
  name: 'teddy',
  factoids:[101,102,103,104,105]
},
{
  id:2,
  name:'grizzly',
  factoids:[201,202,203,204,205]
},
{
  id:3,
  name:'gummy',
  factoids:[301,302,303,304,305]
}];

App.Factoid.FIXTURES = [ {
  category:1,
  id:101,
  text:"Teddy bears were originally manufactured to scare away animals to protect American families."
},
{
  category:1,
  id:102,
  text:"Over 37% of teddy bears on the black market are part gummy or grizzly."
},
{
  category:1,
  id:103,
  text:"Over 98% of teddy bears sold in the U.S. contain nanny cams."
},
{
  category:1,
  id:104,
  text:"The first teddy bear was made out of alpaca wool."
},
{
  category:1,
  id:105,
  text:"At night, teddy bears come to life and dust children's bedrooms."
},
{
  category:2,
  id:201,
  text:"Grizzly bears can sleep for a decade if undisturbed."
},
{
  category:2,
  id:202,
  text:"If you attempt to pet a grizzly bear it will maul your face."
},
{
  category:2,
  id:203,
  text:"Grizzly bears prefer animal style cheeseburgers from In and Out over honey any day."
},
{
  category:2,
  id:204,
  text:"A man from Alaska once attempted to sell grizzly bears in an Amazon web store before PETA had him arrested."
},
{
  category:2,
  id:205,
  text:"The fastest grizzly bear in the world achieved a land speed of 24 mph and scared the piss out of a Yellowstone park ranger."
},
{
  category:3,
  id:301,
  text:"If combined in the correct ratio red and white gummy bears act as an aphrodisiac."
},
{
  category:3,
  id:302,
  text:"The most gummy bears ever fit in a person's mouth is 337."
},
{
  category:3,
  id:303,
  text:"The largest gummy bear in the world is over 502 meters tall and is kept in remote Siberia."
},
{
  category:3,
  id:304,
  text:"When a gummy bear is frozen it can be used as sling shot ammo."
},
{
  category:3,
  id:305,
  text:"If you eat too many you will turn into a tall German man called Hans Vander Winkle."
}];
