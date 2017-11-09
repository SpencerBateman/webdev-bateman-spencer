module.exports = function(app) {

  let userModel = require('../model/user/user.model.server');

  app.post('/api/user', createUser);
  app.get('/api/user', findAllUser);
  app.get('/api/user/:userId', findUserById);
  app.put('/api/user/:userId', updateUser);

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

    if (username && password) {
      userModel
      .findUserByCredentials(username, password)
      .then(function(user) {
        res.json(user);
      });
    } else if (username) {
      userModel
      .findUserByUsername(username)
      .then(function(user) {
        res.json(user);
      });
      return;
    }
  }
}
