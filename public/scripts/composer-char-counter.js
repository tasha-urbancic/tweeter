$(document).ready(function() {
  const tweetTextElement = $(".new-tweet").find('textarea');
  const characterLengthLimit = 140;
  
  tweetTextElement.on('keyup', function(event) {

    let currentCharacterCount = $(this).closest('textarea').val().length;
    const counterElement = $(this).parent().find('.counter');

    let counterValue = characterLengthLimit - currentCharacterCount;

    if (counterValue < 0) {
      counterElement.addClass('characterLimitExceeded');
    } else {
      counterElement.removeClass('characterLimitExceeded');
    }

    counterElement.text(counterValue);

  });
  
});
 