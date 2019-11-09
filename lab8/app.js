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


app.listen("3000", function () {
    console.log("Server is running bby")
});