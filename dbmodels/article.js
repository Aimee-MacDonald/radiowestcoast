const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
  image: {type: String, required: true},
  header: {type: String, required: true},
  synopsis: {type: String, required: true},
  date: {type: String, required: true}
});

module.exports = mongoose.model("article", schema);
