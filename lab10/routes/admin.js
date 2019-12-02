const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");
const dateConverter = require("../tools/datehandler");

router.get("/", function(req, res, next) {
  res.render("admin", {
    title: "Lab 10 - Admin page"
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

module.exports = router;
