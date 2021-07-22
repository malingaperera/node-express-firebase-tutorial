var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // setting the user ID cookie (name, value, expiry)
  var cookie = req.cookies.userId;
  if (cookie === undefined) {
    res.cookie("userId", 1, { maxAge: 365 * 24 * 60 * 60 * 1000 });
    res.render("index", { title: "Express Tutorial", ftu: "Yes" });
  } else {
    res.render("index", { title: "Express Tutorial", ftu: "No" });
  }
});

module.exports = router;
