const express = require("express");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const session = require("express-session");

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session
// Enable sessions
app.use(
  session({
    secret: "6wOBwJBStY"
  })
);
// app.set("trust proxy", 1); // trust first proxy
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   })
// );

// var sess = {
//   secret: "keyboard cat",
//   cookie: {}
// };

// if (app.get("env") === "production") {
//   app.set("trust proxy", 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }

// app.use(session(sess));

// Register partials for hbs
hbs.registerPartials(path.join(__dirname, "/views/partials"));

// Routes
const indexRouter = require("./routes");
const adminRouter = require("./routes/admin");
const loginRouter = require("./routes/login");
const authRouter = require("./routes/auth");

// Route listeners
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);

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
