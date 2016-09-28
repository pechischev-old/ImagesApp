goog.provide("imageApp.AppController");

goog.require("imageApp.AppModel");
goog.require("imageApp.AppView");

goog.require("imageApp.command.History");
goog.require("goog.events.KeyCodes");

goog.require("imageApp.ObjectCollection");
goog.require("imageApp.ObjectController");
goog.require("imageApp.layout.LayoutController");

goog.require("imageApp.view.Button");
goog.require("imageApp.view.ComboBox");

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
			/** @private {imageApp.layout.LayoutController} */
			this._layout = new imageApp.layout.LayoutController(this._model, this._history, this._collection);

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
			toolbar.appendElement(this._createButtonWithAction("Undo", goog.bind(this._undo, this)));
			toolbar.appendElement(this._createButtonWithAction("Redo", goog.bind(this._redo, this)));
			toolbar.appendElement(this._createButtonWithAction("Add image", goog.bind(this._inputProcessing, this)));
			toolbar.appendElement(this._createButtonWithAction("Add text area", goog.bind(this._addTextArea, this)));
			toolbar.appendElement(this._createButtonWithAction("Delete", goog.bind(this._deleteSelectingObject, this)));

			var comboBox = new imageApp.view.ComboBox();
			comboBox.appendElement(this._createButtonWithAction("Default", goog.bind(this._layout.selectTypeLayout, this._layout, "default")));
			comboBox.appendElement(this._createButtonWithAction("Horizontal", goog.bind(this._layout.selectTypeLayout, this._layout, "horizontal")));
			//comboBox.appendElement(this._createButtonWithAction("Custom", goog.bind(this._layout.selectTypeLayout, this._layout, "custom")));
			toolbar.appendElement(comboBox);
			//toolbar.appendElement(this._createButtonWithAction("Add media", goog.bind(this._layout.appendMediaLayout, this._layout)));
			toolbar.appendElement(this._createButtonWithAction("Reset layout", goog.bind(this._layout.resetLayout, this._layout)));

			this._view.setActionFileReader(goog.bind(this._openFile, this));

			goog.events.listen(document, goog.events.EventType.KEYDOWN, goog.bind(function(event) {
				if (event.defaultPrevented)
				{
					return;
				}
				else if (event.ctrlKey && event.keyCode == goog.events.KeyCodes.Z)
				{
					event.preventDefault();
					this._undo();
				}
				else if (event.ctrlKey && event.keyCode == goog.events.KeyCodes.Y)
				{
					event.preventDefault();
					this._redo();
				}
				else if (event.altKey && event.keyCode == goog.events.KeyCodes.E)
				{
					event.preventDefault();
					console.log(this._history);
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