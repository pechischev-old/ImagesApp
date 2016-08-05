goog.provide("Application");

goog.require("model.AppModel");

goog.scope(function() {
    /** @constructor */
    Application = goog.defineClass(null, {
        constructor: function() {
            /** @private {model.AppModel} */
            this._appModel = new model.AppModel();
            this._appModel.addImage();
            this._appModel.addImage();
            this._appModel.addImage();
            this._appModel.addImage();
        },

        update: function () {

        },
        
        run: function() {
            this._appModel.outputLog();
        }
    });
});