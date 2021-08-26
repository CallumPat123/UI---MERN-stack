const mongoose = require("mongoose");

const syllableTyping = mongoose.model(
  "Syllable-Typing",
  new mongoose.Schema({
    Hangul: String
  })
);
module.exports = syllableTyping;
