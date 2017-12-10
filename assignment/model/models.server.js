var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';//mongodb://webappmaker:webappmaker@ds163181.mlab.com:63181/webappmaker';

if(process.env.MLAB_USERNAME_WEBDEV) { // Check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV;
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds135624.mlab.com:35624/heroku_27424s35';
}

var db = mongoose.connect(connectionString, { useMongoClient: true});
module.exports = db;
