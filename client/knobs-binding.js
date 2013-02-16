Template.knobs.rendered = function(){

var createKnobCSS = function(knob, id) {
  var $input     = $(knob.element),
      $container = $('<div class="container '+ id + '">'),
      $body      = $('<div class="ui-knob ui-shadow '+ id + '">'),
      $indicator = $('<div class="ui-indicator '+ id + '">');

  $container.append($body);
  $container.append($indicator);

  // $input.hide();
  $container.insertBefore($input);
  $container.append($input);

  // center knob in container
  $body.css({
    "margin-top": -($body.outerHeight()/2),
    "margin-left":-($body.outerWidth()/2)
  });

  setupKnob(knob, $container[0]);
}

var drawKnobCSS = function(knob, indicator) {
  var $indicator = $(knob.element).siblings('.ui-indicator');
  $indicator.css({
    left: indicator.x - $indicator.outerWidth()/2,
    top:  indicator.y - $indicator.outerHeight()/2
  });

  var rotateText = 'rotate('+(-indicator.angle)+'deg)';
  $indicator.css({
    'transform': rotateText,
    '-webkit-transform': rotateText,
    '-moz-transform': rotateText,
    '-o-transform': rotateText
  });
}

var positionKnob = new Knob(document.getElementById('position'),
  function(knob, indicator) {
    drawKnobCSS(knob, indicator);
  }
);
createKnobCSS(positionKnob, 'position');

var rotateKnob = new Knob(document.getElementById('rotate'),
  function(knob, indicator) {
    drawKnobCSS(knob, indicator);
  }
);
createKnobCSS(rotateKnob, 'rotate');

var positionRotateKnob = new Knob(document.getElementById('position-rotate'),
  function(knob, indicator) {
    drawKnobCSS(knob, indicator);
  }
);
createKnobCSS(positionRotateKnob, 'position-rotate');

}
