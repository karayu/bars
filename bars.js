Bars = new Mongo.Collection('bars');

if (Meteor.isClient) {
  Template.ShowBars.helpers({
    bars: function () {
      return Bars.find({}, {sort: {score: -1}});
    }, 

    selected_name: function () {
      var bar = Bars.findOne({_id: Session.get('selected')});
      return bar && bar.name;
    }
  });

  Template.ShowBars.events({

  });

  Template.Bar.events({
    'click .bar': function () {
      Session.set('selected', this._id);
    }
  });

  Template.Bar.helpers({
    selected: function () {
      
    }
  })

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Bars.find().count() === 0) {
      var names = [
        'Obriens',
        'Woodbury',
        'soma eats',
        'dada'
      ];

      for (var i = 0; i < names.length; i++) {
        Bars.insert({
          name: names[i],
          score: Math.floor(Random.fraction()*10)*5
        });
      }
    }
  });
}
