knobs = {}

updateValue = (category, value)->
  clearTimeout(updateValue.knobTimeout) if updateValue.knobTimeout
  updateValue.knobTimeout = setTimeout ->
    knob = Knobs.findOne {category: category}
    console.error "sending value", value
    Knobs.update({category: category}, {$set: {value: value}})
  , 500
updateValue.knobTimeout = null

Template.knobs.events =
  'change input[type=range]' : (e) ->
    updateValue e.target.id, parseFloat e.target.value

#Template.knobs.rendered = ->
  #knobs.hotttness = new Knob document.getElementById('position-rotate'), (knob, indicator)->
    #drawKnobCSS(knob, indicator)
    #updateValue "hotttnesss", knob.element.value
  #createKnobCSS knobs.hotttness, 'position-rotate'
  
#Meteor.startup ->
  #Meteor.autorun ->
    #for knob in Knobs.find().fetch()
      #console.log "updating knob", knob.category, knob.value
      #if knobs[knob.category] and knobs[knob.category].val() != knob.value
        #console.log "Not setting value"
        ##knobs[knob.category].val(knob.value)
