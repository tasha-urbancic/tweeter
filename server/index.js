require('dotenv').config();

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const nodeSassMiddleware = require('node-sass-middleware');
const app = express();

app.use(nodeSassMiddleware({
  src: `${__dirname}/../public`
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const { MongoClient } = require("mongodb");
// const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const MONGODB_URI = process.env.MONGODB_URI;

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
