const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Subscriber = require(path.join(__dirname, "/dbmodels/subscriber"));
const AdminUser = require(path.join(__dirname, "/dbmodels/adminUser"));

mongoose.connect(process.env.DBVARS, {useNewUrlParser: true});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.post("/signup", (req, res) => {
  var subscriber = new Subscriber({'email': req.body.email});
  subscriber.save(err => {
    if(err) throw(err);
  });
  res.redirect("/");
});

app.get("/admin", (req, res) => {
  res.status(200).render("admin");
});

app.get("/admin/register", (req, res) => {
  res.status(200).render("adminRegister");
});

app.post("/admin/register", (req, res) => {
  var adminUser = new AdminUser({
    'email': req.body.email,
    'password': req.body.password
  });

  adminUser.save(err => {
    if(err) throw err;
  });

  res.status(200).redirect("/admin");
});

app.get("/admin/login", (req, res) => {
  res.status(200).render("adminLogin");
});

app.post("/admin/login", (req, res) => {
  AdminUser.find({email: req.body.email}, function(err, docs){
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.password, docs[0].password, function(err, resp){
        if(err) throw err;

        if(resp){
          /*
          req.login(docs[0]._id, function(err){
            if(err) throw err;
          });
          */
          res.redirect("/admin/user");
        } else {
          res.redirect("admin/login");
        }
      });
    } else {
      res.redirect("/admin/login");
    }
  });
});

app.get("/admin/user", (req, res) => {
  res.status(200).render("adminUser");
});

app.listen(process.env.PORT || 8080);
