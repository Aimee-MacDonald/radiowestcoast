const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

var schema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  access: {type: String, required: true},
  visible: {type: Boolean, required: true},
  username: {type: String, required: false},
  bio: {type: String, required: false}
});

schema.pre("save", function(callback){
  var user = this;
  bcrypt.genSalt(5, function(err, salt){
    if(err) throw err;

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) throw err;
      user.password = hash;
      callback();
    });
  });
});

module.exports = mongoose.model("adminUser", schema);
