Handlebars.registerHelper("current_song", function () {
  return CurrentSong.findOne();
});

Template.playlist.songs = function () {
  return Playlist.find().fetch();
};

Template.players.show = true;

Template.players.players = function () {
  // return Players.find({_id: {$ne: Session.get('player_id')}});
  return Players.find().fetch();
};

var player = function () {
  return Players.findOne(Session.get('player_id'));
};

//////
////// Initialization
//////

Meteor.startup(function () {
  // Allocate a new player id.
  //
  // check for a pre-existing player, and if it exists, make sure the server still
  // knows about us.
  var player_id = Session.get('player_id');
  if (!player_id) {
    player_id = Players.insert({name: smurfs[Math.floor(Math.random() * smurfs.length)], idle: false});
    Session.set('player_id', player_id);
  }

});
