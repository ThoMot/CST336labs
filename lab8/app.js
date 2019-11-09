const express = require("express");
const app = express();
const hbs = require("hbs");

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    console.log(arg1, arg2);
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
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