$(function() {
  const handlers = {
    successfulTweetPost: function() {
      console.log("Successful post!");
    }
  };

  $(".tweet-button")
    .find("input")
    .on("click", function(event) {
      event.preventDefault();
      $.post("/tweets", $("form").serialize(), handlers.successfulTweetPost);
    });
});
