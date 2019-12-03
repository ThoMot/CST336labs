const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");

router.get("/", function(req, res) {
  res.render("index", {
    title: "Lab 10 - Quotes Lookup/Editing",
    link: "window.location.href='/admin'",
    btnName: "Admin",
    username: req.session.username
  });
});

router.get("/authors", function(req, res) {
  const connection = createConnection();
  connection.execute("SELECT firstName, lastName FROM l9_author", function(
    err,
    results,
    fields
  ) {
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
    res.json(results);
  });

  connection.end();
});

router.post("/keywordSearch", function(req, res) {
  const connection = createConnection();
  const searchParam = req.body.keyword;
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
          message: "No matches for given search",
          error: 1
        });
      }
    }
  });
  connection.end();
});

router.post("/genderSearch", function(req, res) {
  const connection = createConnection();
  const searchParam = req.body.gender;
  const query = `SELECT q.quote, CONCAT(a.firstName,' ',a.lastName) as 'author' FROM l9_quotes q INNER JOIN l9_author a ON a.authorId = q.authorId WHERE a.sex LIKE ('${searchParam}')`;
  connection.execute(query, function(err, result, fields) {
    if (err) {
      res.json(err);
    }
    if (result) {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({
          message: "No matches for given search",
          error: 1
        });
      }
    }
  });
  connection.end();
});

router.post("/authorSearch", function(req, res) {
  const connection = createConnection();
  const searchParam = req.body.author;
  const query = `SELECT q.quote, CONCAT(a.firstName,' ',a.lastName) as 'author' FROM l9_quotes q INNER JOIN l9_author a ON a.authorId = q.authorId WHERE a.lastname LIKE ('${searchParam}')`;
  connection.execute(query, function(err, result, fields) {
    if (err) {
      res.json(err);
    }
    if (result) {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({
          message: `${req.body.author} has no quotes`,
          error: true
        });
      }
    }
  });
  connection.end();
});

router.post("/allAuthorInfo", function(req, res) {
  const connection = createConnection();
  const searchParam = req.body.authorName;
  const lastname = searchParam.split(" ")[1];
  const query = `SELECT a.dob, a.dod, a.sex, a.profession, a.country, a.portrait, a.biography, CONCAT(a.firstName,' ',a.lastName) as 'name' FROM l9_author a WHERE a.lastname LIKE ('${lastname}')`;
  connection.execute(query, function(err, result, fields) {
    if (err) {
      res.json(err);
    }
    if (result) {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({
          message: "No matches for given search",
          error: 1
        });
      }
    }
  });
  connection.end();
});

router.post("/categorySearch", function(req, res) {
  const connection = createConnection();
  const searchParam = req.body.category;
  const query = `SELECT q.quote, CONCAT(a.firstName,' ',a.lastName) as 'author' FROM l9_quotes q INNER JOIN l9_author a ON a.authorId = q.authorId WHERE q.category LIKE ('${searchParam}')`;
  connection.execute(query, function(err, result, fields) {
    if (err) {
      res.json(err);
    }
    if (result) {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json({
          message: "No matches for given search",
          error: 1
        });
      }
    }
  });
  connection.end();
});
module.exports = router;
