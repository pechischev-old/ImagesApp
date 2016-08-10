goog.provide("AppController");

goog.require("AppModel");
goog.require("AppView");

goog.require("goog.events");
goog.require("goog.events.EventType");

goog.scope(function() {
    
    /** @param {AppModel} model
      * @constructor
      */
    AppController = goog.defineClass(null, {
        constructor: function(model) {
            /** @private {AppModel} */
            this._model = model;
            /** @private {AppView} */
            this._view = new AppView();

        },
        
        eventLoop: function() {
            goog.events.listen(document.body, goog.events.EventType.CLICK, goog.bind(this._addImage, this));
        },
        
        /** @private */
        _addImage: function() {
            /** @type {!goog.math.Rect} */
            var frame = this._model.addImage();
            var path = this._view.getPath();
            this._view.loadImage(frame, path);
        }
    });
});