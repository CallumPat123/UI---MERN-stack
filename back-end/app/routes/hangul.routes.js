const controller = require("../controllers/hangul.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/hangul/letters", controller.letters);

  app.post("/api/hangul/addLetter", controller.addLetter);
};
