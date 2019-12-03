const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");
const dateConverter = require("../tools/datehandler");
const inputValidation = require("../tools/utilities");
const mysql = require("mysql2");

router.get("/", function(req, res) {
  let loggedin = false;
  if (!loggedin) {
    res.redirect("/login");
  } else {
    res.render("admin", {
      title: "Lab 10 - Admin page",
      link: "window.location.href='/'",
      btnName: "Lookup"
    });
  }
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
});

router.get("/author/:id", function(req, res) {
  const connection = createConnection();
  const sql =
    "SELECT a.authorId, a.firstName, a.lastName, a.dob, a.dod, g.name AS gender, a.profession, a.country, a.portrait, a.biography FROM l9_author a INNER JOIN l9_gender g ON a.sex = g.gender WHERE a.authorId = ?";

  const id = [req.params.id];

  connection.query(sql, id, function(err, result, fields) {
    if (err) {
      res.json(err);
    }
    if (result) {
      if (result.length === 1) {
        result.map(author => {
          // Formatting sql date object into YYYY-MM-DD format
          author.dob = dateConverter(author.dob);
          author.dod = dateConverter(author.dod);
        });
        res.json({
          status: "success",
          author: result[0]
        });
      } else {
        res.json({
          status: "unsuccessful",
          message: "No matches for given search"
        });
      }
    }
  });

  connection.end();
});

router.delete("/author", function(req, res) {
  console.log(req.body);
  const authorId = req.body.authorId;

  const sql =
    "DELETE a.*, q.*, f.* FROM l9_author a LEFT JOIN l9_quotes q ON a.authorId = q.authorId LEFT JOIN l9_favorite f ON q.quoteId = f.quoteId WHERE a.authorId = ?;";

  const connection = createConnection();
  connection.query(sql, authorId, function(error, result, fields) {
    if (error) throw error;
    if (result) {
      if (result.affectedRows > 0) {
        res.json({
          status: "success",
          message: "Author deleted"
        });
      } else if (result.affectedRows === 0) {
        res.json({
          status: "success",
          message: "No rows were deleted"
        });
      }
    }
  });
  connection.end();
});

module.exports = router;
