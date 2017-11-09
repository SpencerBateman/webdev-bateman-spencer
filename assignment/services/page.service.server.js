module.exports = function(app) {

  app.post('/api/website/:websiteId/page', createPage);
  app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
  app.get('/api/page/:pageId', findPageById);
  app.put('/api/page/:pageId', updatePage);
  app.delete('/api/page/:pageId', deletePage);

  let pageModel = require('../model/page/page.model.server');

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;

    page._website = websiteId;
    pageModel
      .createPage(websiteId, page)
      .then(function(page) {
        res.json(page);
      });
  }

  function findAllPagesForWebsite(req, res) {
    const websiteId = req.params['websiteId'];

    pageModel
      .findAllPagesForWebsite(websiteId)
      .then(function(pages) {
        res.json(pages);
      });
  }

  function findPageById(req, res) {
    const pageId = req.params['pageId'];

    pageModel
      .findPageById(pageId)
      .then(function(page) {
        res.json(page);
      });
  }

  function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];

    pageModel
    .updatePage(pageId, page)
    .then(function(page) {
      res.json(page);
    });
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];

    pageModel
    .deletePage(pageId)
    .then(function(pages) {
      res.json({});
    });
  }
}
