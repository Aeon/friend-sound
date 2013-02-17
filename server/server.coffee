
Meteor.startup ->
  unless Knobs.findOne(category:'tempo')?
    Knobs.insert category:'tempo', value:130
  unless Knobs.findOne(category:'loudness')?
    Knobs.insert category:'loudness', value:30
  unless Knobs.findOne(category:'danceability')?
    Knobs.insert category:'danceability', value:0.7
  unless Knobs.findOne(category:'energy')?
    Knobs.insert category:'energy', value:0.7
  unless Knobs.findOne(category:'familiarity')?
    Knobs.insert category:'familiarity', value:0.7
  unless Knobs.findOne(category:'hotttnesss')?
    Knobs.insert category:'hotttnesss', value:0.7
