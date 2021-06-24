const mongoose = require("mongoose");

//Create Schema For URL
const UrlSchema = new mongoose.Schema({
  id: { type: String },
  url: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = URL = mongoose.model("URL", UrlSchema);
