const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register partials for hbs
hbs.registerPartials(path.join(__dirname, "/views/partials"));

// Routes
const indexRouter = require("./routes/index");

// Route listeners
app.use("/", indexRouter);

// Server startup
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
app.listen(port, function() {
  console.log("Express server is running on port: ", port);
});
