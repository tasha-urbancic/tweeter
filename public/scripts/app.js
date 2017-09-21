$(function() {
  const createNewTweets = {
    /**
    * Adds new tweet article to the index.html. 
    * Takes inputs:
    *
    * @param {arrayOfTweets} object
    */
    renderTweets: function(arrayOfTweets) {
      arrayOfTweets.forEach(tweetData => {
        const $tweet = createNewTweets.createTweetElement(tweetData);
        $("#tweets-container").prepend($tweet);
      });
    },
    /**
    * Creates a new tweet article for index.html. 
    * Takes inputs:
    *
    * @param {tweetObject} object
    */
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
            .text(createNewTweets.createDate(tweetObject.created_at))
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
    },
    /**
    * Turns timestamp into a since posted time.
    * Takes inputs:
    *
    * @param {date} number
    *
    * Returns:
    * @param {} string
    */
    createDate: function(date) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }
  };
  const handlingTweets = {
    /**
    * Reloads tweets using loadTweets
    */
    reloadTweets: function() {
      handlingTweets.loadTweets();
    },
    /**
    * Submits a new tweet as a POST.
    * Takes inputs:
    *
    * @param {event} object
    *
    */
    newTweetSubmit: function(event) {
      event.preventDefault();
      const tweetTextSerialized = $("form").serialize();
      const tweetText = $("form textarea").val();

      if (
        handlingTweets.tweetNotEmpty(tweetText) &&
        handlingTweets.tweetNotTooLong(tweetText)
      ) {
        $.post("/tweets", tweetTextSerialized, handlingTweets.reloadTweets);
        $("form textarea").val('');
      } else {
        alert("Tweet needs to be between 1 and 140 characters!");
      }
    },
    /**
    * Loads tweets asynchronusly using Ajax
    * using a GET request to /tweets
    */
    loadTweets: function() {
      $.ajax({
        url: "/tweets",
        method: "GET",
        dataType: "json",
        success: createNewTweets.renderTweets
      });
    },
    /**
    * Checks that tweet is not empty
    * Takes inputs:
    *
    * @param {tweetText} string
    */
    tweetNotEmpty: function(tweetText) {
      if (tweetText === "") {
        return false;
      } else if (tweetText === null) {
        return false;
      } else {
        return true;
      }
    },
    /**
    * Checks that tweet is not too long
    * Takes inputs:
    *
    * @param {tweetText} string
    */
    tweetNotTooLong: function(tweetText) {
      return tweetText.split("").length <= 140;
    },
    /**
    * Animates the compose tweet box on click
    * of the compose button.
    */
    toggleTweetBox: function() {
      $(".new-tweet").slideToggle(150, function() {
        $(".new-tweet")
          .find("textarea")
          .select();
      });
    }
  };

  handlingTweets.toggleTweetBox();
  handlingTweets.loadTweets();
  $(".tweet-button input").on("click", handlingTweets.newTweetSubmit);
  $(".compose-button").on("click", handlingTweets.toggleTweetBox);
});
