const express = require("express");
const router = express.Router();
const gradeQuiz = require("../game/quizmaster");

router.get("/", function(req, res) {
  res.render("index", {
    // Optional data
  });
});

router.post("/", function(req, res) {
  const results = gradeQuiz(req.body.questions);
  res.json(results);
});

module.exports = router;
