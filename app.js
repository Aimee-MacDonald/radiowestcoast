const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const csurf = require("csurf");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const Subscriber = require(path.join(__dirname, "/dbmodels/subscriber"));
const AdminUser = require(path.join(__dirname, "/dbmodels/adminUser"));

const admin = require(path.join(__dirname, "/routes/admin"));
const api = require(path.join(__dirname, "/routes/api"));

mongoose.connect(process.env.DBVARS, {useNewUrlParser: true});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "/static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(fileupload({
  useTempFiles: true
}));

app.use(csurf());

app.use("/admin", admin);
app.use("/api", api);

app.get("/", (req, res) => {
  res.redirect("/news");
});

app.get("/news", (req, res) => {
  if(req.isAuthenticated()){
    res.redirect("/admin/news");
  } else {
    res.status(200).render("news");
  }
});

app.get("/team", (req, res) => {
  if(req.isAuthenticated()){
    res.redirect("/admin/team");
  } else {
    res.status(200).render("team");
  }
});

app.get("/shows", (req, res) => {
  res.status(200).render("shows");
});

app.post("/signup", (req, res) => {
  var subscriber = new Subscriber({'email': req.body.email});
  subscriber.save(err => {
    if(err) throw(err);
  });
  res.redirect("/");
});

app.get("/sponsors", (req, res) => {
  res.status(200).render("sponsors");
});

app.listen(process.env.PORT || 8080);

passport.serializeUser(function(uid, done){
  done(null, uid);
});

passport.deserializeUser(function(uid, done){
  done(null, uid);
});
