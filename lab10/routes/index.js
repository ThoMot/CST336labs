const express = require("express");
const router = express.Router();
//const createConnection = require("../db/database");

router.get("/", function(req, res) {
    res.render("index", {
        title: "Lab 10"
    });
});

module.exports = router;