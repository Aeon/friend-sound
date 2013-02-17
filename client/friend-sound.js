Handlebars.registerHelper("current_song", function () {
  return CurrentSong.findOne();
});

Template.playlist.songs = function () {
  return Playlist.find().fetch();
};

Template.players.show = true;

Template.players.players = function () {
  return Players.find({_id: {$ne: Session.get('player_id')}}).fetch();
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
  /*
  var player_id = Session.get('player_id');
  if (!player_id) {
    player_id = Players.insert({name: smurfs[Math.floor(Math.random() * smurfs.length)], idle: false});
    Session.set('player_id', player_id);
  }
  */

  getPlayerConfig = function() {
    return {
      width: 400,
      height: 300,
      disabledResolvers: [
        "Youtube",
        "Rdio",
        "Deezer"
        // options: "SoundCloud", "Officialfm", "Lastfm", "Jamendo", "Youtube", "Rdio", "SpotifyMetadata", "Deezer", "Exfm"
      ],
      handlers: {
        onloaded: function() {
          console.log(track.connection+":\n  api loaded");
        },
        onended: function() {
          console.log(track.connection+":\n  Song ended: "+track.artist+" - "+track.title);
          CurrentSong.remove({});
          next_song = Playlist.findOne();
          CurrentSong.insert(next_song);
        },
        onplayable: function() {
          console.log(track.connection+":\n  playable");
        },
        onresolved: function(resolver, result) {
          console.log(track.connection+":\n  Track found: "+resolver+" - "+ result.track + " by "+result.artist);
        },
        ontimeupdate: function(timeupdate) {
          var currentTime = timeupdate.currentTime;
          var duration = timeupdate.duration;
          currentTime = parseInt(currentTime);
          duration = parseInt(duration);

          console.log(track.connection+":\n  Time update: "+currentTime + " "+duration);
        }
      }
    };
  };

console.log('setting up autorun');
  Meteor.autorun(function() {
    var current_song = CurrentSong.findOne();
    console.log('autobots engage');
    if (!!current_song) {
      track = window.tomahkAPI.Track(current_song.title, current_song.artist_name, getPlayerConfig());
      $('#tomahawk-player').append(track.render());
    }
  });

});
