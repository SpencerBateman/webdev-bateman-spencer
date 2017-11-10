var mongoose = require('mongoose');
var WidgetSchema = require('./widget.schema.server');
var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;

function createWidget(pageId, widget) {
  console.log(widget);
  return WidgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  var query = {_id: widgetId};
  return WidgetModel.update(query, widget);
}

function deleteWidget(widgetId) {
  var query = {_id: widgetId};
  return WidgetModel.deleteOne(query);
}

// Eventuall add a reorder widget element

module.exports = WidgetModel;


