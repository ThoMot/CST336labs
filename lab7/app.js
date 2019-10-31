const express = require("express");
const app = express();

//requires request to get content from a webpage
const request = require("request");

app.set("view engine", "hbs");

//folder for images and css, javascript
app.use(express.static("public"));

//Routes
//request - information sent from the browser to the server
//response - what we get from the server to the browser
app.get("/", function (req, res) {
    request("https://pixabay.com/api/?key=13831356-14c2a0af637ced29bdc287ad0", function (error, response, body) {
        if(!error && response.statusCode == 200){ //no issues on request
            let parsedData = JSON.parse(body); //parses the text in body to a json object
            let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
            res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);


        } else {
            console.log(response.statusCode);
            console.log(error);
        }
    })
});


//starting the server
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.listen(port, function() {
    console.log("Express server is Running on port: ", port);
});

