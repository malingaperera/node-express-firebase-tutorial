var express = require("express");
var router = express.Router();

const db = require("./firestore");
router.use(express.json());

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
