const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");

const AdminUser = require(path.join(__dirname, "../dbmodels/adminUser"));
const Article = require(path.join(__dirname, "../dbmodels/article"));

router.get("/", (req, res) => {
  if(req.isAuthenticated()){
    res.redirect("/admin/news");
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
    var dataPackage = {csrfToken: req.csrfToken()};

    Article.find({"_id" : req.query.id}, function(err, docs){
      if(err) throw err;

      if(docs.length > 0){
        dataPackage.id = req.query.id;
        dataPackage.image = docs[0].image;
        dataPackage.header = docs[0].header;
        dataPackage.synopsis = docs[0].synopsis;
        dataPackage.date = docs[0].date;
      }

      res.status(200).render("admin_create", dataPackage);
    });
  } else {
    res.redirect("/admin/login");
  }
});

router.post("/createArticle", (req, res) => {
  if(req.isAuthenticated()){
    if(req.body.id){
      Article.find({"_id": req.body.id}, function(err, docs){
        if(err) throw err;

        if(docs.length > 0){
          var article = docs[0];
          article.image = req.body.image;
          article.header = req.body.header;
          article.synopsis = req.body.synopsis;
          article.date = req.body.date;
          if(req.body.visible){
            article.visible = true;
          } else {
            article.visible = false;
          }

          article.save(err => {
            if(err) throw err;
          });
        }
      });
    } else {
      var article = new Article({
        'image': req.body.image,
        'header': req.body.header,
        'synopsis': req.body.synopsis,
        'date': req.body.date
      });

      if(req.body.visible){
        article.visible = true;
      } else {
        article.visible = false;
      }

      article.save(err => {
        if(err) throw err;
      });
    }
    
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
app.get("/admin/logout", (req, res) => {
  //TODO: Secure This!!
  req.logout();
  res.status(200).redirect("/");
});
*/

module.exports = router;
