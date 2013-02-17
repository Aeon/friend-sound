Template.knobs.knobs = ->
  [{category:"tempo", defaultValue: 90, step:1, min:40 , max:180},
  {category:"loudness", defaultValue: -10 , step:1, min:-60 , max:0},
  {category:"familiarity", defaultValue: 0.9, step:0.01, min:0 , max:1},
  {category:"hotttnesss", defaultValue: 0.2, step:0.01, min:0 , max:0.8},
  {category:"energy", defaultValue: 0.8, step:0.01, min:0 , max:1},
  {category:"danceability", defaultValue: 0.8, step:0.01, min:0 , max:1}]