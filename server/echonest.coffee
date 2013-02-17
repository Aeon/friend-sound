### 
Request:
http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV&format=json&results=1&artist=radiohead&title=karma%20police&bucket=audio_summary&bucket=song_hotttnesss&bucket=artist_familiarity

Response:

{
    "response": {
        "songs": [
            {
                "artist_familiarity": 0.919746, 
                "artist_id": "ARH6W4X1187B99274F", 
                "artist_name": "Radiohead", 
                "audio_summary": {
                    "analysis_url": "http://echonest-analysis.s3.amazonaws.com/TR/WyaFYgdVkIx66SBTss-p-gPRCDfdvtSpXDWOTphKFGTVTfWltUT5UEe7tHRg%3D%3D/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1361055211&Signature=czXOnO/fdk0W5YdbHqagvuIlH3Q%3D", 
                    "audio_md5": "3c4605604beb21a91db738822d9a4bcf", 
                    "danceability": 0.440120887280722, 
                    "duration": 261.62667, 
                    "energy": 0.28881483462997554, 
                    "key": 7, 
                    "liveness": 0.15102694521175616, 
                    "loudness": -9.174, 
                    "mode": 1, 
                    "speechiness": 0.027434817503186992, 
                    "tempo": 74.924, 
                    "time_signature": 4
                }, 
                "id": "SOHJOLH12A6310DFE5", 
                "song_hotttnesss": 0.838239,
                "title": "Karma Police"
            }
        ], 
        "status": {
            "code": 0, 
            "message": "Success", 
            "version": "4.2"
        }
    }
}
###

SEARCH_URL="http://developer.echonest.com/api/v4/song/search?"

getValue = (category) ->
  Knobs.findOne(category: category).value

getEchonestParams = () ->
  tempo = getValue 'tempo'
  loudness = getValue 'loudness'
  familiarity = getValue 'familiarity'
  hotttnesss = getValue 'hotttnesss'
  danceability = getValue 'danceability'
  energy = getValue 'energy'
  params =
    api_key: 'BOLND4XS0ULGFU0YV'
    min_tempo: tempo - 20
    max_tempo: tempo + 20
    min_loudness: loudness - 10
    max_loudness: loudness + 10
    artist_min_familiarity: familiarity - 0.1
    artist_max_familiarity: familiarity + 0.1
    song_min_hotttnesss: hotttnesss - 0.1
    song_max_hotttnesss: hotttnesss + 0.1
    min_danceability: danceability - 0.1
    max_danceability: danceability + 0.1
    min_energy: energy - 0.1
    max_energy: energy + 0.1
    bucket: ['audio_summary', 'song_hotttnesss', 'artist_familiarity']
    results: 40

makeQueryString = (params) ->
  qs = ''
  for name, values of params
    unless values instanceof Array
      values = [values]
    for v in values
      qs += "&#{name}=#{v}"
  return qs

Meteor.startup ->
  
  #There should only ever be one
  Knobs.find({}).observe
    changed: (newDoc, index, oldDoc) ->
      console.log "Doc changed:", newDoc
      params = getEchonestParams()
      qs = makeQueryString params
      console.log "Query", qs
      Meteor.http.get SEARCH_URL, query: qs, (error, result) ->
        if error
          console.error error, result
        else
          console.log "Data:", result.data
          console.log "Songs:", result.data.response.songs
          for s in result.data.response.songs
            song.song_id = s.id
            song.title = s.title
            song.artist_id = s.artist_id
            song.artist_name = s.artist_name
            song.tempo = s.audio_summary.tempo
            song.loudness = s.audio_summary.loudness
            song.danceability = s.audio_summary.tempo
            song.energy = s.audio_summary.energy
            song.hotttnesss = s.song_hotttnesss
            song.familiarity = s.artist_familiarity
            Playlist.insert song

            




