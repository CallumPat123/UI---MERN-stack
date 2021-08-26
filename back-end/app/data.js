const bcrypt = require("bcryptjs");
const admin = [
  {
    username: "Callum",
    email: "Callumroy@me.com",
    studentNumber: "22723279",
    password: bcrypt.hashSync("1234", 8),
    isAdmin: true
  },
  {
    username: "test",
    email: "test@test.com",
    studentNumber: "22723279",
    password: bcrypt.hashSync("1234", 8),
    isAdmin: false
  }
];
module.exports = admin;
