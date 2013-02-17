
Meteor.startup ->
  if Knobs.find().count() == 0
    Knobs.insert category:"tempo", value:90, defaultValue: 90, step:1, min:40 , max:260
    Knobs.insert category:"loudness", value:-10, defaultValue: -10 , step:1, min:-30 , max:20
    Knobs.insert category:"familiarity", value:0.9, defaultValue: 0.9, step:0.01, min:0 , max:1
    Knobs.insert category:"hotttnesss", value:0.8, defaultValue: 0.8, step:0.01, min:0 , max:1
    Knobs.insert category:"energy", value:0.8, defaultValue: 0.8, step:0.01, min:0 , max:1
    Knobs.insert category:"danceability", value:0.8, defaultValue: 0.8, step:0.01, min:0 , max:1

  Players.remove({})

  CurrentSong.insert {
    song_id       : "SOHJOLH12A6310DFE5",
    duration      : 261.62667,
    title         : "Karma Police",
    artist_id     : "ARH6W4X1187B99274F",
    artist_name   : "Radiohead",
    tempo         : 74.924,
    loudness      : -9.174,
    danceability  : 0.440120887280722,
    energy        : 0.28881483462997554,
    familiarity   : 0.7,
    hotttnesss    : 1
  }
