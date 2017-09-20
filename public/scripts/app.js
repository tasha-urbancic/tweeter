/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  const createNewTweets = {
    renderTweets: function(arrayOfTweets) {
      arrayOfTweets.forEach(tweetData => {
        const $tweet = createNewTweets.createTweetElement(tweetData);
        $("#tweets-container").prepend($tweet);
      });
    },
    createTweetElement: function(tweetObject) {
      const article = $("<article>").addClass("tweet");
  
      const avatarImage = $("<img>")
        .addClass("user-avatar")
        .attr("src", tweetObject.user.avatars.small)
        .attr("alt", tweetObject.user.name);
  
      const headerImg = $("<a>")
        .attr("href", "#")
        .append(avatarImage);
  
      const headerUsername = $("<a>")
        .attr("href", "#")
        .addClass("user-name")
        .text(tweetObject.user.name);
  
      const headerHandle = $("<a>")
        .attr("href", "#")
        .addClass("user-handle")
        .text(tweetObject.user.handle);
  
      const header = $("<header>")
        .append(headerImg)
        .append(headerUsername)
        .append(headerHandle);
  
      const tweetContentBody = $("<p>")
        .text(tweetObject.content.text)
        .addClass("tweet-auto-wrap");
  
      const tweetContent = $("<div>")
        .addClass("tweet-content")
        .append(tweetContentBody);
  
      const timestamp = $("<div>")
        .addClass("tweet-timestamp")
        .append(
          $("<a>")
            .attr("href", "#")
            .text(Date(tweetObject.created_at))
        );
  
      const likeImage = $("<img>")
        .addClass("like")
        .attr("src", "images/like.png")
        .attr("alt", "like");
  
      const likeLink = $("<a>")
        .attr("href", "#")
        .append(likeImage);
  
      const flagImage = $("<img>")
        .addClass("flag")
        .attr("src", "images/flag.png")
        .attr("alt", "flag");
  
      const flagLink = $("<a>")
        .attr("href", "#")
        .append(flagImage);
  
      const retweetImage = $("<img>")
        .addClass("retweet")
        .attr("src", "images/retweet.png")
        .attr("alt", "retweet");
  
      const retweetLink = $("<a>")
        .attr("href", "#")
        .append(retweetImage);
  
      const tweetActions = $("<div>")
        .addClass("tweet-actions")
        .append(likeLink)
        .append(flagLink)
        .append(retweetLink);
  
      const footer = $("<footer>")
        .append(timestamp)
        .append(tweetActions);
  
      article.append(header);
      article.append(tweetContent);
      article.append(footer);
  
      return article;
    }
  };
  const handlingTweets = {
    reloadTweets: function() {
      handlingTweets.loadTweets();
    },
    newTweetSubmit: function(event) {
      event.preventDefault();
      const tweetTextSerialized = $("form").serialize();
      const tweetText = $("form textarea").val();

      if (
        handlingTweets.tweetNotEmpty(tweetText) &&
        handlingTweets.tweetNotTooLong(tweetText)
      ) {
        $.post("/tweets", tweetTextSerialized, handlingTweets.reloadTweets);
      } else {
        alert("Tweet needs to be between 1 and 140 characters!");
      }
    },
    loadTweets: function() {
      $.ajax({
        url: "/tweets",
        method: "GET",
        dataType: "json",
        success: createNewTweets.renderTweets
      });
    },
    tweetNotEmpty: function(tweetText) {
      if (tweetText === "") {
        return false;
      } else if (tweetText === null) {
        return false;
      } else {
        return true;
      }
    },
    tweetNotTooLong: function(tweetText) {
      return tweetText.split("").length <= 140;
    },
    toggleTweetBox: function() {
      $(".new-tweet").slideToggle(150, function() {
        $(".new-tweet")
          .find("textarea")
          .select();
      });
    }
  };

  handlingTweets.loadTweets();
  $(".tweet-button input").on("click", handlingTweets.newTweetSubmit);
  $(".compose-button").on("click", handlingTweets.toggleTweetBox);
});

