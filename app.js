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

const Subscriber = require(path.join(__dirname, "/dbmodels/subscriber"));
const AdminUser = require(path.join(__dirname, "/dbmodels/adminUser"));

const admin = require(path.join(__dirname, "/routes/admin"));

mongoose.connect(process.env.DBVARS, {useNewUrlParser: true});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

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

app.use(csurf());

app.use("/admin", admin);

app.get("/", (req, res) => {
  res.redirect("/news");
});

app.get("/news", (req, res) => {
  res.status(200).render("news");
});

app.get("/team", (req, res) => {
  res.status(200).render("team");
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

app.get("/getTeamProfiles", (req, res) => {
  AdminUser.find({visible: true}, function(err, docs){
    if(err) throw err;

    var response = [];

    for(var i = 0; i < docs.length; i++){
      var tm = {};
      if(docs[i].username != undefined){
        tm.name = docs[i].username;
      } else {
        tm.name = docs[i].email;
      }
      tm.bio = docs[i].bio;
      response.push(tm);
    }
    res.status(200).send(response);
  });
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
