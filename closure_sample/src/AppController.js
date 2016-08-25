goog.provide("AppController");

goog.require("AppModel");
goog.require("AppView");
goog.require("ImageController");
goog.require("command.History");

goog.scope(function() {
    
    /** 
     * @param {AppModel} model
     * @constructor
     */
    AppController = goog.defineClass(null, {
        /**
         * @param {AppModel} model
         */
        constructor: function(model) {
            /** @private {command.History} */
            this._history = new command.History();
            /** @private {AppModel} */
            this._model = model;
            /** @private {AppView} */
            this._view = new AppView();
			/** @private {ImageController} */
            this._imageCntr = new ImageController(this._model.getImagesModel(), this._view.getImagesView(), this._history);
            
            this._addActions();
        },

        /** 
         * @private 
         */
        _openFile: function() { 
            var input = window.event.target;
            var reader = new FileReader();
            reader.onload = goog.bind(function() {
                this._addImage(reader.result.toString());
            },  this);
            reader.readAsDataURL(input.files[0]);
        },

		/**
         * @private
         */
        _deleteImage: function() {
            this._imageCntr.deleteImage();
        },
        
        /** 
         * @param {string} path
         * @private 
         */
        _addImage: function(path) { // TODO: отметить загрузку картинки
            this._imageCntr.addImage(path);
        },
        
	    /**
         * @private
         */
        _undo: function(){
            this._history.undo();
        },

        /**
         * @private
         */
        _redo: function() {
            this._history.redo();
        },

        /**
         * @private 
         */
        _addActions: function() {
            var toolbar = this._view.getToolbar();
            toolbar.getButtonOnIndex(0).setAction(goog.bind(this._undo, this));
            toolbar.getButtonOnIndex(1).setAction(goog.bind(this._redo, this));
            toolbar.getButtonOnIndex(2).setAction(goog.bind(this._inputProcessing, this));
            toolbar.getButtonOnIndex(3).setAction(goog.bind(this._deleteSelectingImage, this));
            this._view.setActionFileReader(goog.bind(this._openFile, this));
        },

		/**
		 * @private
         */
        _deleteSelectingImage:function() {
            this._imageCntr.deleteImage();
        },

        /**
         * @private 
         */
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