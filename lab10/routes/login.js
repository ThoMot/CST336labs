const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.render("login", {
    title: "Lab 10 - Login",
    link: "window.location.href='/'",
    btnName: "Lookup"
  });
});

router.post("/", function(req, res) {
  let successful = false;
  let message = "";

  if (req.body.username === "root" && req.body.password === "toor") {
    successful = true;
    req.session.username = req.body.username;
  } else {
    delete req.session.username;
    message = "Wrong username or password";
  }

  res.json({
    successful: successful,
    message: message
  });
});

module.exports = router;
