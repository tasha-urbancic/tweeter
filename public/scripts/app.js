/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetObject) {
  // return tweet article
  $(function() {

    //Make article
    const page = $('.container').children();
    page.append($('<article>').addClass('tweet'));

    // make header, body and footer: append to article
    const article = $('.tweet').last();
    article.append($('<header>'));
    article.append($('<div>').addClass('tweet-content'));
    article.append($('<footer>'));

    // make user avatar image, wrap in a link and append to header
    article.find('header').append($('<a>').attr('href', '#'));
    const avatarImage = $('<img>').addClass("user-avatar").attr('src', tweetObject.user.avatars.small).attr('alt', tweetObject.user.name);
    article.find('header').find('a').first().append(avatarImage);
    
    // add username to header, with link wrapper
    article.find('header').append($('<a>').attr('href', '#').addClass('user-name').text(tweetObject.user.name));

    // add userhandle to header, with link wrapper
    article.find('header').append($('<a>').attr('href', '#').addClass('user-handle').text(tweetObject.user.handle));

    // added tweet content
    article.find('.tweet-content').append($('<p>').text(tweetObject.content.text));

    // added a footer timestamp
    article.find('footer').append($('<div>').addClass('tweet-timestamp'));
    article.find('.tweet-timestamp').append($('<a>').attr('href', '#').text(Date(tweetObject.created_at)));
    // change timestamp to real time

    //create the three like, flag and retweet buttons in the footer
    article.find('footer').append($('<div>').addClass('tweet-actions'));
    article.find('.tweet-actions').append($('<a>').attr('href', '#')).append($('<a>').attr('href', '#')).append($('<a>').attr('href', '#'));

    const likeImage = $('<img>').addClass("like").attr('src', "images/like.png").attr('alt', "like");
    article.find('.tweet-actions').children().first().append(likeImage);

    const flagImage = $('<img>').addClass("flag").attr('src', "images/flag.png").attr('alt', "flag");
    article.find('.tweet-actions').children().first().append(flagImage);

    const retweetImage = $('<img>').addClass("retweet").attr('src', "images/retweet.png").attr('alt', "retweet");
    article.find('.tweet-actions').children().first().append(retweetImage);

  });
}

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const $tweet = createTweetElement(tweetData);

// console.log($tweet);
// $('#tweets-container').append($tweet);