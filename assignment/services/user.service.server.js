module.exports = function(app) {

  app.get('/api/user', findAllUser);
  app.post('/api/user', createUser);
  app.get('/api/user/:userId', findUserById);


  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" },
    {_id: "999", username: "spencer", password: "spencer", firstName: "Spencer",   lastName: "Bateman" }
  ];

  function findUserById(req, res) {
    var userId  = req.params['userId'];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function createUser(req, res) {
    var user = req.body;
    console.log(user);
    users.push(user);
    res.json(user);
  };

  function findAllUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if (username && password) {
      var user = users.find(function (user) {
        return user.username === username && user.password === password;
      });

      if (user) {
        res.json(user);
      } else {
        res.json({});
      }
      return;
    } else if (username) {
      var user = users.find(function (user) {
        return user.username === username;
      });
      if (user) {
        res.json(user);
      } else {
        res.json({});
      }
      return;
    }

    res.json(users);
  }
}
