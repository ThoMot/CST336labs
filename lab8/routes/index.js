const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
   res.render("index", {
      title: "Title String",
      answers: {
         q1: "",
         q2: ""
      },
      original: {}
   });
});

router.post("/", function (req, res) {
   console.log(req.body);
   res.render("index", {
      answers: {
         q1: "asdasd"
      },
      original: req.body
   })

});


module.exports = router;