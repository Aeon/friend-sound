###
# Knobs:
# fields:
#   category
#   value
#
# category value (displayed below is a range)
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
markSongPlayed = (song) -> PlayedSongs.insert song_id: song.song_id
hasSongPlayed = (song) ->
  songId = song
  if 'object' == typeof song
    songId = song.song_id
  PlayedSongs.findOne(song_id: songId)?

###
# Songs:
#
# song_id
# title
# artist_id
# artist_name
# tempo
# loudness
# danceability
# energy
# familiarity
# hotttnesss
###
Playlist = new Meteor.Collection 'playlist'

