const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/static")));

app.get("/", (req, res) => {
  res.status(200).render("preview2");
});

app.get("/admin", (req, res) => {
  res.status(200).render("admin");
})

app.get("/admin/preview1", (req, res) => {
  res.status(200).render("preview");
});

app.get("/admin/preview2", (req, res) => {
  res.status(200).render("preview2");
});

app.listen(process.env.PORT || 8080);
