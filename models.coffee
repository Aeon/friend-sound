###
# Knobs:
# Singleton Object
# 
# tempo [0..500.0]
# loudness [-100.0..100.0]
# familiarity [0.0..1.0]
# hotttnesss [0.0..1.0]
# danceability [0.0..1.0]
# energy [0.0..1.0]
###
Knobs = new Meteor.Collection 'knobs'

###
# Access via markSongPlayed and hasSongPlayed
###
PlayedSongs = new Meteor.Collection 'playedSongs'
markSongPlayed = (song) -> PlayedSongs.insert songId: song.id
hasSongPlayed = (song) ->
  songId = song
  if 'object' == typeof song
    songId = song.id
  PlayedSongs.findOne(songId)?

###
# Songs:
#
# id
# title
# artist_id
# artist_name
# tempo
# loudness
# familiarity
# hotttnesss
# danceability
# energy
###
Playlist = new Meteor.Collection 'playlist'

###
# Players:
#
# id
# name
# idle
###
Players = new Meteor.Collection "players";

###
# Smurfs
#
# names for new players
###
smurfs = ['Papa','Brainy','Hefty','Handy','Jokey','Smurfette','Nat','Slouchy','Snappy','Grouchy','Greedy','Dreamy','Wooly','Nobody','Somebody','Vanity','Clumsy','Lazy','Poet','Farmer','Tailor','Harmony','Painter','Tracker','Miner','Weakling','Scaredy','Editor','Reporter','Flighty','Sweepy','Weepy','Sickly','Dabbler','Timber','Sloppy','Nosey','Timid','Tuffy','Pushover','Marco','Medic','Double','Golfer','Barber']
