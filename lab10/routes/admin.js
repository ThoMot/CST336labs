const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");
const dateConverter = require("../tools/datehandler");
const inputValidation = require("../tools/utilities");
const mysql = require("mysql2");

router.get("/", function(req, res) {
  res.render("admin", {
    title: "Lab 10 - Admin page",
    link: "window.location.href='/'",
    btnName: "Lookup"
  });
});

router.get("/authors", function(req, res, next) {
  const connection = createConnection();
  connection.execute(
    "SELECT authorId, firstName, lastName, dob, dod FROM l9_author",
    function(err, results, fields) {
      if (err) {
        console.log(err);
        res.json({
          status: "error",
          message: "Error retrieving authors"
        });
      } else {
        results.map(author => {
          // Formatting sql date object into YYYY-MM-DD format
          author.dob = dateConverter(author.dob);
          author.dod = dateConverter(author.dod);
        });
        res.json({
          status: "success",
          authors: results
        });
      }
    }
  );
  connection.end();
});

router.put("/author/update", function(req, res) {
  const {
    authorId,
    firstName,
    lastName,
    dob,
    dod,
    sex,
    profession,
    country,
    portrait,
    biography
  } = req.body;

  let sql =
    "UPDATE l9_author SET firstName=?, lastName=?, dob=?, dod=?, sex=?, profession=?, country=?, portrait=?, biography=? WHERE authorId=?";
  const inputs = [
    firstName,
    lastName,
    dob,
    dod,
    sex,
    profession,
    country,
    portrait,
    biography,
    authorId
  ];

  inputValidation(inputs);

  // Preparing sql and handles sqli
  sql = mysql.format(sql, inputs);

  const connection = createConnection();
  connection.query(sql, function(error, results, fields) {
    if (error) throw error;
    if (results.affectedRows === 1) {
      res.json({
        status: "success",
        message: "Update successful"
      });
    } else {
      res.json({
        status: "failed",
        message: "Update unsuccessful"
      });
    }
  });
  connection.end();
});

router.post("/author/add", function(req, res) {
  const {
    firstName,
    lastName,
    dob,
    dod,
    sex,
    profession,
    country,
    portrait,
    biography
  } = req.body;

  const inputs = [
    firstName,
    lastName,
    dob,
    dod,
    sex,
    profession,
    country,
    portrait,
    biography
  ];

  inputValidation(inputs);

  let sql =
    "INSERT INTO l9_author (firstName, lastName, dob, dod, sex, profession, country, portrait, biography) VALUES (?)";

  sql = mysql.format(sql, [inputs]);

  const connection = createConnection();

  connection.query(sql, function(error, result, fields) {
    if (error) console.error(error);
    if (result) {
      res.json({
        status: "success",
        message: `New author added with id: ${result.insertId}`
      });
    } else {
      res.json({
        status: "unsuccessful",
        message: "Author creation failed"
      });
    }
  });

  connection.end();
});

module.exports = router;
