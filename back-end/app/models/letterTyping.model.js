const mongoose = require("mongoose");

const letterTyping = mongoose.model(
  "Letter-Typing",
  new mongoose.Schema({
    english: String,
    Hangul: String
  })
);
module.exports = letterTyping;
