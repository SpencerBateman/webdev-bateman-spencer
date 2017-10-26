module.exports = function(app) {

  app.post('/api/user/:userId/website', createWebsite);
  app.get('/api/user/:userId/website', findAllWebsitesForUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.put('/api/website/:websiteId', updateWebsite);
  app.delete('/api/website/:websiteId', deleteWebsite);

  websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" },
    { "_id": "333", "name": "Spencers",     "developerId": "999", "description": "Lorem" }
  ];

  function createWebsite(req, res) {
    var website = req.body;
    website._id = Math.floor(Math.random() * 1000 + 1).toString();
    websites.push(website);
    res.json(website);
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    var userWebsites = websites.filter(function (obj) {
      return obj.developerId == userId;
    });
    res.json(userWebsites);
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    var website = websites.find(function (website) {
      return website._id == websiteId;
    });
    res.json(website);
  }

  function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];

    for (let x = 0; x < websites.length; x++) {
      if (websiteId === websites[x]._id) {
        websites[x] = website;
      }
    }
    res.json(websites)

  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    for (let i = 0; i < websites.length; i++ ) {
      if (websites[i]._id === websiteId) {
        websites.splice(i, 1);
      }
    }
    res.json(websites);
  }
}
