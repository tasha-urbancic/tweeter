$(document).ready(function() {
  const tweetTextElement = $(".new-tweet").find('textarea');
  const characterLengthLimit = 140;
  
  tweetTextElement.on('keyup', (event) => {

    const currentCharacterCount = $(event.target).val().length;
    const counterElement = $(event.target).parent().find('.counter');
    const counterValue = characterLengthLimit - currentCharacterCount;

    if (counterValue < 0) {
      counterElement.addClass('characterLimitExceeded');
    } else {
      counterElement.removeClass('characterLimitExceeded');
    }

    counterElement.text(counterValue);

  });
  
});
 