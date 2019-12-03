const express = require("express");
const router = express.Router();

router.get("/logout", function(req, res) {
  if (req.session && req.session.username) {
    delete req.session.username;
  }
  res.json({
    successful: true,
    message: ""
  });
});

module.exports = router;
