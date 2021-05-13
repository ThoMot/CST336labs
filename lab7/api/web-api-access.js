//requires request to get content from a webpage
const request = require("request");

//Returns all data from the Pixabay API as JSON
module.exports = function getImages(keyword, orientation) {
  //Make a new promise that returns resolve or reject depending on the function it contains
  return new Promise(function(resolve, reject) {
    request(
      "https://pixabay.com/api/?key=13831356-14c2a0af637ced29bdc287ad0" +
        "&orientation=" +
        orientation +
        "&q=" +
        keyword,
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          //no issues on request
          let parsedData = JSON.parse(body); //parses the text in body to a json object

          let picIndex = randomPics(parsedData.hits.length);
          let pix = picIndex.map(i => parsedData.hits[i]);

          //if promise resolves return a resolve
          resolve(pix);

          //let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
          //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
          //res.render("index", {"image1":parsedData.hits[randomIndex].largeImageURL});
        } else {
          //if promise doesnt resolve return reject
          reject(error);
          console.log(response.statusCode);
          console.log(error);
        }
      }
    );
  });
};

function randomPics(n) {
  let arr = [];
  let numOfPic = 4;
  if (n < 4) {
    numOfPic = n;
  }
  while (arr.length < numOfPic) {
    let r = Math.floor(Math.random() * n);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
