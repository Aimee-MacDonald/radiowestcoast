const express = require("express");
const router = express.Router();
const path = require("path");

const Article = require(path.join(__dirname, "../dbmodels/article"));

router.get("/newsItems", (req, res) => {
  Article.find({}, (err, docs) => {
    if(err) throw err;

    var respac = docs.filter(function(i){
      return i.visible;
    });

    res.status(200).send(respac);
  });
});

module.exports = router;
