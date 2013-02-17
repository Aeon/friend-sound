knobs = {}

updateValue = (category, value)->
  clearTimeout(updateValue.knobTimeout) if updateValue.knobTimeout
  updateValue.knobTimeout = setTimeout ->
    knob = Knobs.findOne {category: category}
    console.error "sending value", value
    Knobs.update({category: category}, {$set: {value: value}})
  , 500
  updateValue.knobTimeout = null
  
Meteor.startup ->
  $(".dial").knob {
    'release' : (v) ->
      updateValue this.$.attr('id'), v
  }
  Meteor.autorun ->
    for knob in Knobs.find().fetch()
      if $("##{knob.category}") and $("##{knob.category}").val() != ""+knob.value
        $("##{knob.category}").val(knob.value);
        console.log "Setting value", knob.category, "from ", knob.value, " to ", $("##{knob.category}").val(), knob.value == $("##{knob.category}").val()
