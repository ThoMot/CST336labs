const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.render("login", {
    title: "Lab 10 - Login",
    link: "window.location.href='/'",
    btnName: "Lookup"
  });
});

module.exports = router;
