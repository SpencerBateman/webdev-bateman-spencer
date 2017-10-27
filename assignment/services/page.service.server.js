module.exports = function(app) {

  app.post('/api/website/:websiteId/page', createPage);
  app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
  app.get('/api/page/:pageId', findPageById);
  app.put('/api/page/:pageId', updatePage);
  app.delete('/api/page/:pageId', deletePage);

  pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
  ];

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.page.body;

    page._id = Math.floor(Math.random() * 1000 + 1).toString();
    page.websiteId = websiteId;
    pages.push(page);
    res.json(page);
  }

  function findAllPagesForWebsite(req, res) {
    const websiteId = req.params['websiteId'];
    var list_of_pages = pages.filter(function (page) {
      return page.websiteId == websiteId;
    });
    res.json(list_of_pages);
  }

  function findPageById(req, res) {
    const pageId = req.params['pageId'];
    const page = pages.find(function (page) {
      return page._id == pageId;
    });
    res.json(page);

  }

  function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];

    for (let x = 0; x < pages.length; x++) {
      if (pageId === pages[x]._id) {
        pages[x] = page;
      }
    }
    res.json(pages);
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    for (let x = 0; x < pages.length; x ++) {
      if (pageId === pages[x]._id) {
        pages.splice(x, 1);
      }
    }
    res.json(pages);
  }
}
