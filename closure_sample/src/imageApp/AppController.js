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
goog.require("goog.events.EventTarget");


goog.scope(function() {
	
	/** 
	 * @param {imageApp.AppModel} model
	 * @constructor]
	 * @extends {goog.events.EventTarget}
	 */
	imageApp.AppController = goog.defineClass(goog.events.EventTarget, {
		/**
		 * @param {imageApp.AppModel} model
		 */
		constructor: function(model) {
			goog.base(this);
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

			/** @private {boolean} */
			this._isAppendMedia = false;
			this._addActions();
		},

		/** 
		 * @private 
		 */
		_openFile: function(event) {
			var files = event.target.files;
			for (var i = 0, file; file = files[i]; i++)
			{
				// Only process image files.
				if (!file.type.match('image.*')) {
					continue;
				}
				var reader = new FileReader();
				// Closure to capture the file information.
				reader.onload = goog.bind(function(event) {
					var url = event.target.result;
					this._addImage(url);
				},  this);

				// Read in the image file as a data URL.
				reader.readAsDataURL(file);
			}
			event.target.value = "";
		},

		/** 
		 * @param {string} path
		 * @private 
		 */
		_addImage: function(path) {
			goog.style.setStyle(document.documentElement, "cursor", "progress");
			var img = new Image(0, 0);
			img.src = path;
			img.onload = goog.bind(function () {
				var image = this._model.createImage(new goog.math.Size(img.naturalWidth, img.naturalHeight), img.src);
				if (this._isAppendMedia)
				{
					this._isAppendMedia = false;
					this._layout.appendMedia(image);
				}
				else
				{
					this._objectCntr.addImage(image);
				}
				goog.style.setStyle(document.documentElement, "cursor", "default");
			}, this);

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
			toolbar.appendElement(comboBox);
			toolbar.appendElement(this._createButtonWithAction("Add media", goog.bind(function () {
				if (!this._layout.hasAddedMedia())
				{
					this._isAppendMedia = true;
					this._inputProcessing();
				}
			}, this)));
			toolbar.appendElement(this._createButtonWithAction("Remove media", goog.bind(this._layout.removeMedia, this._layout)));
			toolbar.appendElement(this._createButtonWithAction("Reset layout", goog.bind(this._layout.resetLayout, this._layout, true)));

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