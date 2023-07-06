$(document).ready(function() {
    $('#tweet-text').on('input', function() {
     const textarea = 140 - $(this).val().length;
     const $counter = $(this).parent().find(".counter");
     $counter.text(textarea);
      if (textarea < 0) {
        $counter.addClass("counter-red");
      } else {
        $counter.removeClass("counter-red");
      }
    });
  });