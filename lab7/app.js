const express = require("express");
const app = express();


app.set("view engine", "hbs");

//folder for images and css, javascript
app.use(express.static("public"));

//Routes
//request - information sent from the browser to the server
//response - what we get from the server to the browser
const indexRouter = require('./routes/index');
app.use('/', indexRouter);


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

