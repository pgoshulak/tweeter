const MAX_CHARS = 140;

$(document).ready(() => {
  let composer = $('#composer > textarea');
  let counter = $('#composer > .counter');
  let charCount = MAX_CHARS;

  composer.on('keyup', function(e) {
    charCount = $(this).val().length;
    counter.text(MAX_CHARS - charCount);
    
    if (charCount > MAX_CHARS) {
      counter.addClass('counter-over-limit');
    } else {
      counter.removeClass('counter-over-limit');
    }
  })
})