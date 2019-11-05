var express = require("express");
var router = express.Router();
const getImages = require("../api/web-api-access");

router.get("/", async function(req, res) {
  let keyword = "";
  let orientation = "vertical";

  if (req.query.keyword !== undefined) {
    keyword = req.query.keyword;
  } else {
    const defaultSearch = [
      "San Francisco",
      "New York",
      "Los Angeles",
      "Monterey"
    ];
    const searchNum = Math.floor(Math.random() * defaultSearch.length);
    keyword = defaultSearch[searchNum];
  }

  if (req.query.orientation == "horizontal") {
    orientation = "horizontal";
  }

  let parsedData = await getImages(keyword, orientation);
  res.render("index", { images: parsedData });
}); //root route

module.exports = router;
