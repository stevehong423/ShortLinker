const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");

const URL = require("../../models/urlSchema");

//Allow CORS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//POST Request --> /api/shorten
router.post("/", (req, res) => {
  if (req.body.url) {
    urlInfo = req.body.url;
  }
  //Check to see if URL exists in database
  URL.findOne({ url: urlInfo }, (error, data) => {
    if (data) {
      console.log("URL Exists in Database!");
      return data;
    } else {
      console.log("New URL");
      //If URL doesn't exist, create new URL Address
      const urlAddress = new URL({
        id: uniqid(),
        url: urlInfo,
      });
      //Save URL to database
      urlAddress.save((error) => {
        if (error) {
          return console.error(error);
        }
        res.send({
          url: urlInfo,
          hash: urlAddress.id,
          status: 200,
        });
      });
    }
  });
});

module.exports = router;