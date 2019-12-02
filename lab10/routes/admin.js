const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");


router.get("/", function (req, res) {
    res.render("admin", {
        title: "Lab 10 - Admin page",
        link: "window.location.href='/'",
        btnName: "Lookup"
    });
});


module.exports = router;