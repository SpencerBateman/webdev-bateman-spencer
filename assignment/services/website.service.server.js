module.exports = function(app) {

  app.post('/api/user/:userId/website', createWebsite);
  app.get('/api/user/:userId/website', findAllWebsitesForUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.put('/api/website/:websiteId', updateWebsite);
  app.delete('/api/website/:websiteId', deleteWebsite);

  let websiteModel = require('../model/website/website.model.server');

  function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params['userId'];

    website._user = userId;

    websiteModel
      .createWebsiteForUser(userId, website)
      .then(function(website) {
        res.json(website);
      });
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];

    websiteModel
      .findAllWebsitesForUser(userId)
      .then(function(userWebsites) {
        res.json(userWebsites);
      });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];

    websiteModel
      .findWebsiteById(websiteId)
      .then(function(website) {
        res.json(website);
      });
  }

  function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];

    websiteModel
      .findWebsiteById(websiteId)
      .then(function(websiteId) {
        res.json(websites);
      });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    websiteModel
      .deleteWebsite(websiteId)
      .then(function(websites) {
        res.json({});
      });
  }
}
