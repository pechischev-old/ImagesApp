goog.provide("AppController");

goog.require("AppModel");
goog.require("AppView");

//goog.require("goog.events");

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
            this._addActions();
        },

        /**
         * @param {!Event} event
         * @private
         */
        _openFile: function(event) { // TODO: in developing
            var input = event.target;
            var reader = new FileReader();
            reader.onload = goog.bind(function() {
                this._addImage(reader.result.toString());
            },  this);
            reader.readAsDataURL(input.files[0]);
        },
        
        /** @param {string} path
         * @private */
        _addImage: function(path) {
            /** @type {!goog.math.Rect} */
            var frame = this._model.addImage();
            this._view.loadImage(frame, path);
        },
        
        /** @private */
        _addActions: function() {
            var toolbar = this._view.getToolbar();
            toolbar.getButtonOnIndex(0).setAction(function(){console.log("undo")});
            toolbar.getButtonOnIndex(1).setAction(function(){console.log("redo")});
            toolbar.getButtonOnIndex(2).setAction(goog.bind(this._inputProcessing, this));
            //var fileForm = this._view.setActionFileReader(goog.bind(this._openFile, this));
        },

        /** @private */
        _inputProcessing: function() {
            var dataInputForm = this._view.getDataInputForm();
            if (dataInputForm)
            {
                this._addImage(dataInputForm);
            }
            else
            {
                this._view.clickFileReader();
            }
        }
        
       
    });
});