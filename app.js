const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Subscriber = require(path.join(__dirname, "/dbmodels/subscriber"));

mongoose.connect(process.env.DBVARS, {useNewUrlParser: true});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/signup", (req, res) => {
  var subscriber = new Subscriber({'email': req.body.email});
  subscriber.save(err => {
    if(err) throw(err);
  });
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.listen(process.env.PORT || 8080);
