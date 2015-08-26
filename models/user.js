var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
                    email: { type: String, required: true, index: {unique:true}},
                    password: { type: String, required: true, select: false},
                });

userSchema.pre('save',function(next){
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, null,null,function(err,hash){
    user.password = hash;
    next();
  })
});

UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

var User = mongoose.model("user", userSchema);

module.exports = User;
