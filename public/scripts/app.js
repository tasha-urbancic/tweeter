/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetObject) {
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

  const tweetContentBody = $("<p>").text(tweetObject.content.text);

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

function renderTweets(arrayOfTweets) {
  arrayOfTweets.forEach(tweetData => {
    const $tweet = createTweetElement(tweetData);
    $(function() {
      $("#tweets-container").append($tweet);
    });
  });
}

// Fake data taken from tweets.json
var data = [
  {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: {
        small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 1461113796368
  }
];

renderTweets(data);
