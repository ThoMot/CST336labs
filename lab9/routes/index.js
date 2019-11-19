const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

router.get("/", function(req, res) {
  // console.log("HOST: ", process.env.DB_HOST);
  // console.log("USER: ", process.env.DB_USER);
  // console.log("PASSWORD: ", process.env.DB_PASSWORD);
  // console.log("DATABASE: ", process.env.DB_DATABASE);
  res.render("index", {
    title: "Lab 9"
  });
});

router.get("/authors", function(req, res) {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.execute("SELECT firstName, lastName FROM l9_author", function(
    err,
    results,
    fields
  ) {
    // console.log(results);
    res.json(results);
  });
  connection.end();
});

router.get("/genders", function(req, res) {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.execute("SELECT DISTINCT sex FROM l9_author", function(
    err,
    results,
    fields
  ) {
    // console.log(results);
    res.json(results);
  });
  connection.end();
});

router.get("/categories", function(req, res) {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.execute("SELECT DISTINCT category from l9_quotes", function(
    err,
    results,
    fields
  ) {
    // console.log(results);
    res.json(results);
  });

  connection.end();
});

module.exports = router;
