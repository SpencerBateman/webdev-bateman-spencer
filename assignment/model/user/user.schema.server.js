var mongoose = require('mongoose');
var UserSchema = mongoose.Schema ({
  username: String,
  password: String,
  facebook: {
    id:    String,
    token: String
  },
  firstName: String,
  lastName: String,
}, {collection: 'user'});

module.exports = UserSchema;

