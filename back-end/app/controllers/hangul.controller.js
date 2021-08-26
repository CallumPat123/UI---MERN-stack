const expressAsyncHandler = require("express-async-handler");
const db = require("../models/index.js");
const Letter = db.letters;

var letters = require("../letters.js");

exports.letters = expressAsyncHandler(async (req, res) => {
  await Letter.remove({});
  const createdLetters = await Letter.insertMany(letters);
  res.send({ createdLetters });
});

exports.addLetter = (req, res) => {
  const letter = new Letter({
    english: req.body.english
  });

  letter.save((err, letter) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send({ message: "Letter was added!" });
    }
  });
};
