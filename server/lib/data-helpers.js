"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");


module.exports = function makeDataHelpers(db) {
  return {
    /**
    * saveTweets function saves a new tweet into
    * the database. Takes inputs:
    *
    * @param {newTweet} object
    * @param {callback} function
    *
    * It performs the callback on the new tweet.
    */
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },
    /**
    * getTweets function looks to database for 
    * tweets and sorts by time.
    *
    * @param {callback} function
    *
    */
    getTweets: function(callback) {
      db
        .collection("tweets")
        .find()
        .sort({ created_at: 1 })
        .toArray(callback);
    },
    /**
    * likeTweets function looks to database for 
    * the tweet that corresponds to the liked tweet
    *
    * @param {callback} function
    *
    */
    likeTweet: function(id, callback) {
      db.collection("tweets").update(
        {_id: id},
        {$inc: {"likeCount": 1}}
      );

      callback(null, true);
    }
  };
};
