var express = require("express");
var auth = require("basic-auth");
var router = express.Router();

const db = require("./firestore");
router.use(express.json());

router.route("/").get(function (req, res, next) {
  // We call firestore read, check firestore.js
  var user = auth(req);
  if (user && user.name === "admin" && user.pass === "admin") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    // We call firestore list, check firestore.js
    db.list(500)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => next(err));
  } else {
    res
      .set({
        "WWW-Authenticate": 'Basic realm="simple-admin"'
      })
      .sendStatus(401);
  }
});

/* GET users listing. */
router
  .route("/:userId")
  .get(function (req, res, next) {
    // We call firestore read, check firestore.js
    db.read(req.params.userId)
      .then((rdata) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(rdata);
      })
      .catch((err) => next(err));
  })
  .post(function (req, res, next) {
    // We call firestore create, check firestore.js
    db.create(req.params.userId, req.body)
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(data);
      })
      .catch((err) => next(err));
  })
  .put(function (req, res, next) {
    // We call firestore update, check firestore.js
    db.update(req.params.userId, req.body)
      .then((data) => {
        db.read(req.params.userId)
          .then((rdata) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(rdata);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  })
  .delete(function (req, res, next) {
    db.delete(req.params.userId)
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(data);
      })
      .catch((err) => next(err));
  });

module.exports = router;
