const mongoose = require("mongoose");

const shortSentences = mongoose.model(
  "Short-Sentences",
  new mongoose.Schema({
    english: String,
    Hangul: String
  })
);
module.exports = shortSentences;
