module.exports = function(app) {

  app.post('/api/page/:pageId/widget', createWidget);
  app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
  app.get('/api/widget/:widgetId', findWidgetById);
  app.put('/api/widget/:widgetId', updateWidget);
  app.delete('/api/widget/:widgetId', deleteWidget);

  widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
      "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
      "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
  ];

  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;

    widget._id = Math.floor(Math.random() * 1000 + 1).toString();
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    const pageId = req.params['pageId'];
    var list_of_widget = widgets.filter(function (widget) {
      return widget.pageId == pageId;
    });
    res.json(list_of_widget);
  }

  function findWidgetById(req, res) {
    const pageId = req.params['pageId'];
    const widget = widgets.find(function (widget) {
      return widget._id == widgetId;
    });
    res.json(widget);

  }

  function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];

    for (let x = 0; x < widget.length; x++) {
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
