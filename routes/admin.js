const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");

const AdminUser = require(path.join(__dirname, "../dbmodels/adminUser"));
const Article = require(path.join(__dirname, "../dbmodels/article"));

router.get("/", (req, res) => {
  if(req.isAuthenticated()){
    AdminUser.find({_id: req.user}, function(err, docs){
      if(err) throw err;

      if(docs.length > 0){
        if(docs[0].access === "admin"){
          res.status(200).render("admin");
        } else {
          res.redirect("/admin/news");
        }
      }
    });
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/login", (req, res) => {
  res.status(200).render("adminLogin", {csrfToken: req.csrfToken()});
});

router.post("/login", (req, res) => {
  AdminUser.find({email: req.body.email}, function(err, docs){
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.password, docs[0].password, function(err, resp){
        if(err) throw err;

        if(resp){
          req.login(docs[0]._id, function(err){
            if(err) throw err;
          });

          res.redirect("/admin/news");
        } else {
          res.redirect("/admin/login");
        }
      });
    } else {
      res.redirect("/admin/login");
    }
  });
});

router.get("/news", (req, res) => {
  if(req.isAuthenticated()){
    res.status(200).render("admin_news");
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/create", (req, res) => {
  if(req.isAuthenticated()){
    res.status(200).render("admin_create", {csrfToken: req.csrfToken()});
  } else {
    res.redirect("/admin/login");
  }
});

router.post("/createArticle", (req, res) => {
  if(req.isAuthenticated()){
    var article = new Article({
      'image': req.body.image,
      'header': req.body.header,
      'synopsis': req.body.synopsis,
      'date': req.body.date
    });

    article.save(err => {
      if(err) throw err;
    });

    res.redirect("/admin/news");
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/delete", (req, res) => {
  Article.deleteOne({"_id": req.query.id}, function(err){
    if(err) throw err;
  });
});

router.get("/newsItems", (req, res) => {
  Article.find({}, function(err, docs){
    if(err) throw err;
    res.status(200).send(docs);
  });
});

router.get("/register", (req, res) => {
  res.status(200).render("adminRegister", {csrfToken: req.csrfToken()});
});

router.post("/register", (req, res) => {
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
              res.redirect("/admin/news");
            });
          }
        });
      });
    }
  });
});

/*
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

*/

module.exports = router;
