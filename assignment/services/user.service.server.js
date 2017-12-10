module.exports = function(app) {
  var userModel = require('../model/user/user.model.server');
  var passport = require('passport');
  var bcrypt = require("bcrypt-nodejs");

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.get('/api/hello', function(req, res) {
    res.send('api hello world');
  });

  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/loggedIn', loggedIn);
  app.post('/api/register', register);
  app.post('/api/logout', logout);

  app.get('/api/user', findAllUser);
  app.get('/api/user/:userId', findUserById);
  app.put('/api/user/:userId', updateUser);
  app.post('/api/user', createUser);

  app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get ('/facebook/oauth2callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:4200/profile',
    failureRedirect: 'http://localhost:4200/login'
  }));

  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;

  passport.use(new LocalStrategy(localStrategy));

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
  };

  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(function(user) {
        if (user) {
          return done(null, user);
        } else {
          var names = profile.displayName.split(" ");
          var newFacebookUser = {
            lastName:  names[1],
            firstName: names[0],
            email:     profile.emails ? profile.emails[0].value:"",
            facebook: {
              id:    profile.id,
              token: token
            }
          };
          return userModel.createUser(newFacebookUser);
        }
      })
      .then(function(user) {
        return done(null, user);
      });
  }

  function loggedIn(req, res) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  function localStrategy(usrn, pass, done) {
    userModel.findUserByUsername(usrn).then(function(user) {
      if (user.username === usrn && bcrypt.compareSync(pass, user.password)) {
        console.log('sucessfully done');
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }

  function login(req, res) {
    res.json(req.user);
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user).then(function(user) {
      req.login(user, function(err) {
        res.json(user);
      });
    });
  }

  function serializeUser(user, done) {
    done(null, user);
  }


  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    userModel
      .updateUser(userId, user)
      .then(function(user) {
        res.json(user);
      });
  }

  function findUserById(req, res) {
    var userId  = req.params['userId'];

    userModel
      .findUserById(userId)
      .then(function(user) {
        res.json(user);
      });
  }

  function createUser(req, res) {
    var user = req.body;

    userModel
      .createUser(user)
      .then(function(user) {
        console.log("then");
        console.log(user);
        res.json(user);
      });
  };

  function findAllUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
//    res.send('return all users');
//*
    if (username && password) {
      res.send('[0] username && password');
//       userModel
//         .findUserByCredentials(username, password)
//         .then(function(user) {
//           res.json(user);
//         });
      return;
    } else if (username) {
      res.send('[1] username');
//       userModel
//         .findUserByUsername(username)
//         .then(function(user) {
//           res.json(user);
//         });
      return;
    } else {
//       res.send('[2] return all users');
      userModel
        .findAllUsers()
        .then(function(users) {
          res.json(users);
        }, function(err){
          res.send(err);
        });
      return;
    }
   // */
      return;
  }
}
