const mongoose = require("mongoose");

const wordsTyping = mongoose.model(
  "Words-Typing",
  new mongoose.Schema({
    english: String,
    Hangul: String
  })
);
module.exports = wordsTyping;
