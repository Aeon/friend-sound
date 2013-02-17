
Meteor.startup ->
  unless Knobs.findOne(category:'tempo')?
    Knobs.insert category:'tempo', value:110
  unless Knobs.findOne(category:'loudness')?
    Knobs.insert category:'loudness', value:-10
  unless Knobs.findOne(category:'danceability')?
    Knobs.insert category:'danceability', value:0.7
  unless Knobs.findOne(category:'energy')?
    Knobs.insert category:'energy', value:0.5
  unless Knobs.findOne(category:'familiarity')?
    Knobs.insert category:'familiarity', value:0.7
  unless Knobs.findOne(category:'hotttnesss')?
    Knobs.insert category:'hotttnesss', value:0.7

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