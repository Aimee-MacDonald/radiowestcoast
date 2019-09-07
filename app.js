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

app.get("/admin", (req, res) => {
  if(req.isAuthenticated()){
    AdminUser.find({_id: req.user}, function(err, docs){
      if(err) throw err;

      if(docs.length > 0){
        if(docs[0].access === "admin"){
          res.status(200).render("admin");
        } else {
          res.redirect("/admin/user");
        }
      }
    });
  } else {
    res.redirect("/admin/login");
  }
});

app.get("/admin/register", (req, res) => {
  res.status(200).render("adminRegister", {csrfToken: req.csrfToken()});
});

app.post("/admin/register", (req, res) => {
  AdminUser.find({email: req.body.email}, function(err, docs){
    if(err) throw err;

    if(docs.length > 0){
      // User Already Exists
      res.status(200).redirect("/admin/login");
    } else {
      var adminUser = new AdminUser({
        'email': req.body.email,
        'password': req.body.password,
        'access': "user",
        'visible': 'false'
      });

      adminUser.save(err => {
        if(err) throw err;
        AdminUser.find({email: req.body.email}, function(err, docs){
          if(err) throw err;

          if(docs.length > 0){
            req.login(docs[0]._id, function(err){
              if(err) throw err;
              res.redirect("/admin/user");
            });
          }
        });
      });
    }
  });
});

app.get("/admin/login", (req, res) => {
  res.status(200).render("adminLogin", {csrfToken: req.csrfToken()});
});

app.post("/admin/login", (req, res) => {
  AdminUser.find({email: req.body.email}, function(err, docs){
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.password, docs[0].password, function(err, resp){
        if(err) throw err;

        if(resp){
          req.login(docs[0]._id, function(err){
            if(err) throw err;
          });

          switch(docs[0].access){
            case "user":
              res.redirect("/admin/user");
              break;
            case "admin":
              res.redirect("/admin");
              break;
          }
        } else {
          res.redirect("/admin/login");
        }
      });
    } else {
      res.redirect("/admin/login");
    }
  });
});

app.get("/admin/user", (req, res) => {
  if(req.isAuthenticated()){
    AdminUser.find({_id: req.user}, function(err, docs){
      if(err) throw err;

      if(docs.length > 0){
        if(docs[0].access === "user"){
          res.status(200).render("adminUser");
        } else {
          res.redirect("/admin");
        }
      }
    });
  } else {
    res.redirect("/admin/login");
  }
});

app.get("/admin/getUsers", (req, res) => {
  //TODO: Secure This!!
  AdminUser.find({}, function(err, docs){
    if(err) throw err;

    var returnPackage = [];
    for(var i = 0; i < docs.length; i++){
      var uo = {
        'user': docs[i].email,
        'access': docs[i].access
      }

      returnPackage.push(uo);
    }
    res.send({users: returnPackage});
  });
});

app.get("/admin/getMailinglist", (req, res) => {
  //TODO: Secure This!!
  Subscriber.find({}, function(err, docs){
    if(err) throw err;
    res.status(200).send(docs);
  });
});

app.get("/admin/logout", (req, res) => {
  //TODO: Secure This!!
  req.logout();
  res.status(200).redirect("/");
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

app.listen(process.env.PORT || 8080);


passport.serializeUser(function(uid, done){
  done(null, uid);
});

passport.deserializeUser(function(uid, done){
  done(null, uid);
});
