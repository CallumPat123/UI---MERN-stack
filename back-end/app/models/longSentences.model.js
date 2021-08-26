const mongoose = require("mongoose");

const longSentences = mongoose.model(
  "Long-sentences",
  new mongoose.Schema({
    english: String,
    Hangul: String
  })
);
module.exports = longSentences;
