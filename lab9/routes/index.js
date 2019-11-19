const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");

router.get("/", function(req, res) {
  res.render("index", {
    title: "Lab 9"
  });
});

router.get("/authors", function(req, res) {
  const connection = createConnection();
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
  const connection = createConnection();

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
  const connection = createConnection();

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

router.post("/keywordSearch/:keyword", function(req, res) {
  const connection = createConnection();
  const searchParam = req.params.keyword;
  const words = searchParam.split(" ");
  let searchQuery = "'%";
  words.forEach((word, i) => {
    searchQuery += word;
    if (i < words.length - 1) {
      searchQuery += " ";
    } else {
      searchQuery += "%'";
    }
  });
  const query = `SELECT q.quote, CONCAT(a.firstName,' ',a.lastName) as 'author' FROM l9_quotes q INNER JOIN l9_author a ON a.authorId = q.authorId WHERE quote LIKE ${searchQuery};`;
  connection.execute(query, function(err, result, fields) {
    if (err) {
      res.json(err);
    }
    if (result) {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({
          statusMessage: "No matches for given search"
        });
      }
    }
  });
  connection.end();
});

module.exports = router;
