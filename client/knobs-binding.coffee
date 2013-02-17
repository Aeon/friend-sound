knobs = {}

#createKnobCSS = (knob,id)->
  #$input = $(knob.element)
  #$container = $('<div class="container '+ id + '">')
  #$body      = $('<div class="ui-knob ui-shadow '+ id + '">')
  #$indicator = $('<div class="ui-indicator '+ id + '">')

  #$container.append($body)
  #$container.append($indicator)

  ## $input.hide();
  #$container.insertBefore($input)
  #$container.append($input)

  ##center knob in container
  #$body.css
    #"margin-top": $body.outerHeight()/2
    #"margin-left": -($body.outerWidth()/2)
  #setupKnob(knob, $container[0])

#drawKnobCSS = (knob, indicator)->
  #$indicator = $(knob.element).siblings('.ui-indicator')
  #$indicator.css
    #left: indicator.x - $indicator.outerWidth()/2
    #top:  indicator.y - $indicator.outerHeight()/2

  #rotateText = 'rotate('+(-indicator.angle)+'deg)'
  #$indicator.css
    #'transform': rotateText
    #'-webkit-transform': rotateText
    #'-moz-transform': rotateText
    #'-o-transform': rotateText

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
