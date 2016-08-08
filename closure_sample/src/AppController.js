goog.provide("AppController");

goog.require("AppModel");
goog.require("AppView");

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
            
        },
        
        /** @private */
        _addImage: function() {
            /** @type {!goog.math.Rect} */
            var frame = this._model.addImage();
            this._view.createImage(frame);
        }
    });
});