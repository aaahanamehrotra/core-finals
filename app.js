const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();

const app = express();

require("./config/passport")(passport);

db = process.env.MONGOURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.login = req.isAuthenticated();

  next();
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/product", require("./routes/product"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("listening"));
