createKnobCSS = (knob,id)->
  $input = $(knob.element)
  $container = $('<div class="container '+ id + '">')
  $body      = $('<div class="ui-knob ui-shadow '+ id + '">')
  $indicator = $('<div class="ui-indicator '+ id + '">')

  $container.append($body)
  $container.append($indicator)

  # $input.hide();
  $container.insertBefore($input)
  $container.append($input)

  #center knob in container
  $body.css
    "margin-top": -($body.outerHeight()/2)
    "margin-left": -($body.outerWidth()/2)
  setupKnob(knob, $container[0]);

drawKnobCSS = (knob, indicator)->
  $indicator = $(knob.element).siblings('.ui-indicator')
  $indicator.css
    left: indicator.x - $indicator.outerWidth()/2
    top:  indicator.y - $indicator.outerHeight()/2

  rotateText = 'rotate('+(-indicator.angle)+'deg)'
  $indicator.css
    'transform': rotateText
    '-webkit-transform': rotateText
    '-moz-transform': rotateText
    '-o-transform': rotateText

Template.knobs.rendered = ->
  positionKnob = new Knob document.getElementById('position'), (knob, indicator)->
    drawKnobCSS(knob, indicator)
    console.log knob.element.value
  createKnobCSS positionKnob, 'position'
  
  rotateKnob = new Knob document.getElementById('rotate'), (knob, indicator)->
    drawKnobCSS(knob, indicator)
  createKnobCSS rotateKnob, 'rotate'

  positionRotateKnob = new Knob document.getElementById('position-rotate'), (knob, indicator)->
    drawKnobCSS(knob, indicator)
  createKnobCSS positionRotateKnob, 'position-rotate'