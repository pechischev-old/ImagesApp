goog.provide("imageApp.AppController");

goog.require("imageApp.AppModel");
goog.require("imageApp.AppView");
//goog.require("imageApp.ImageController");
goog.require("imageApp.command.History");
goog.require("goog.events.KeyCodes");

goog.require("imageApp.ObjectCollection");
goog.require("imageApp.ObjectController");
goog.require("imageApp.layout.LayoutControl");

goog.require("goog.events");
goog.require("goog.events.EventType");

goog.scope(function() {

	/** 
	 * @param {imageApp.AppModel} model
	 * @constructor
	 */
	imageApp.AppController = goog.defineClass(null, {
		/**
		 * @param {imageApp.AppModel} model
		 */
		constructor: function(model) {
			/** @private {imageApp.command.History} */
			this._history = new imageApp.command.History();
			/** @private {imageApp.AppModel} */
			this._model = model;
			/** @private {imageApp.AppView} */
			this._view = new imageApp.AppView();

			/** @private {imageApp.ObjectCollection} */
			this._collection = new imageApp.ObjectCollection();
			/** @private {imageApp.ObjectController} */
			this._objectCntr = new imageApp.ObjectController(this._model, this._view , this._history, this._collection);
			/** @private {imageApp.layout.LayoutControl} */
			this._layout = new imageApp.layout.LayoutControl();
	
			this._layout.initHeaderLayout(this._initLayoutObject());
			this._layout.initDescriptionLayout(this._initLayoutObject());
			this._layout.setDefaultLayout();
			this._addActions();

			document.addEventListener("append media", goog.bind(function(){
				this._layout.initMediaLayout(this._initLayoutObject());
			}, this), false);

			document.addEventListener("remove media", goog.bind(function(){
				this._layout.removeMediaLayout();
				
			}, this), false);
		},

		/**
		 * @returns {imageApp.model.Object}
		 * @private
		 */
		_initLayoutObject: function () {
			var textarea = this._model.createTextArea();
			this._collection.appendObject(textarea);
			return textarea;
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
		 * @param {string} path
		 * @private 
		 */
		_addImage: function(path) {
			this._objectCntr.addImage(path);
		},

		/**
		 * @private
		 */
		_addTextArea: function () {
			this._objectCntr.addTextArea();
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
			toolbar.appendButton(this._createButtonWithAction("Undo", goog.bind(this._undo, this)));
			toolbar.appendButton(this._createButtonWithAction("Redo", goog.bind(this._redo, this)));
			toolbar.appendButton(this._createButtonWithAction("Add image", goog.bind(this._inputProcessing, this)));
			toolbar.appendButton(this._createButtonWithAction("Add text area", goog.bind(this._addTextArea, this)));
			toolbar.appendButton(this._createButtonWithAction("Delete", goog.bind(this._deleteSelectingObject, this)));
			toolbar.appendButton(this._createButtonWithAction("Default", goog.bind(this._layout.setDefaultLayout, this._layout)));
			toolbar.appendButton(this._createButtonWithAction("Horizontal", goog.bind(this._layout.setHorizontalLayout, this._layout)));

			this._view.setActionFileReader(goog.bind(this._openFile, this));

			goog.events.listen(document, goog.events.EventType.KEYDOWN, goog.bind(function(event) {
				if (event.defaultPrevented)
				{
					return;
				}
				else if (event.ctrlKey && event.keyCode == goog.events.KeyCodes.Z)
				{
					this._undo();
				}
				else if (event.ctrlKey && event.keyCode == goog.events.KeyCodes.Y)
				{
					this._redo();
				}
			}, this));
		},

		/**
		 * @param name
		 * @param {Function} action
		 * @private
		 * @return {imageApp.view.Button}
		 */
		_createButtonWithAction:function(name, action) {
			var btn = new imageApp.view.Button(name);
			btn.setAction(action);
			return btn;
		},

		/**
		 * @private
		 */
		_deleteSelectingObject:function() {
			this._objectCntr.deleteObject();
			this._layout.checkRemoveMedia();
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