module.exports = function(app) {

  app.post('/api/page/:pageId/widget', createWidget);
  app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
  app.get('/api/widget/:widgetId', findWidgetById);
  app.put('/api/widget/:widgetId', updateWidget);
  app.delete('/api/widget/:widgetId', deleteWidget);

  let widgetModel = require('../model/widget/widget.model.server');

  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;

    widget._page = pageId;
    widgetModel
      .createWidget(pageId, widget)
      .then(function(widget) {
        res.json(widget);
      });
  }

  function findAllWidgetsForPage(req, res) {
    const pageId = req.params['pageId'];

    widgetModel
      .findAllWidgetsForPage(pageId)
      .then(function(widgets) {
        res.json(widgets);
      });
  }

  function findWidgetById(req, res) {
    const widgetId = req.params['widgetId'];

    widgetModel
      .findWidgetById(widgetId)
      .then(function(widget) {
        res.json(widget);
      });

  }

  function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];

    for (let x = 0; x < widgets.length; x++) {
      if (widgetId === widgets[x]._id) {
        widgets[x] = widget;
      }
    }
    res.json(widgets);
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    for (let x = 0; x < widgets.length; x ++) {
      if (widgetId === widgets[x]._id) {
        widgets.splice(x, 1);
      }
    }
    res.json(widgets);
  }
}
