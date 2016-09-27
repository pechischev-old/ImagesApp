goog.provide("imageApp.ObjectController");



goog.require("imageApp.command.AddObjectCommand");
goog.require("imageApp.command.DeleteCommand");
goog.require("imageApp.command.MoveCommand");
goog.require("imageApp.command.ResizeCommand");
goog.require("imageApp.command.AppendTextCommand");

goog.require("imageApp.events.EventType");

goog.scope(function() {
	var MoveCommand = imageApp.command.MoveCommand;
	var ResizeCommand = imageApp.command.ResizeCommand;
	var AddObjectCommand = imageApp.command.AddObjectCommand;
	var DeleteCommand = imageApp.command.DeleteCommand;
	var AppendTextCommand = imageApp.command.AppendTextCommand;

	/**
	 * @param {imageApp.AppModel} model
	 * @param {imageApp.AppView} view
	 * @param {imageApp.command.History} history
	 * @param {imageApp.ObjectCollection} collection
	 * @constructor
	 */
	imageApp.ObjectController = goog.defineClass(null, {
		/**
		 * @param {imageApp.AppModel} model
		 * @param {imageApp.AppView} view
		 * @param {imageApp.command.History} history
		 * @param {imageApp.ObjectCollection} collection
		 */
		constructor: function(model, view, history, collection) {
			/** @private {imageApp.AppModel} */
			this._model = model;
			/** @private {imageApp.AppView} */
			this._view = view;
			/** @private {imageApp.command.History} */
			this._history = history;
			/** @private {imageApp.ObjectCollection} */
			this._objectCollection = collection;

			this._addMoveListener();
			this._addResizeListener();
			this._addTextListener();
			this._addAppendListener();
		},

		addTextArea: function () {
			var textAreaModel = this._model.createTextArea("");

			var command = new AddObjectCommand(this._objectCollection, textAreaModel);
			this._history.recordAction(command);
		},

		/**
		 * @param {string} path
		 */
		addImage: function(path) {
			goog.style.setStyle(document.documentElement, "cursor", "progress");
			var img = new Image(0, 0);
			img.src = path;
			img.onload = goog.bind(this._onLoadImage, this, img);
		},

		/**
		 * @private
		 */
		_addAppendListener: function () {
			goog.events.listen(this._objectCollection, imageApp.events.EventType.APPEND_OBJECT, goog.bind(function (event) {
				var appendEvent = new CustomEvent(imageApp.events.EventType.APPEND_OBJECT, { detail : event.detail});
				this._view.dispatchEvent(appendEvent);
			}, this));
		},

		/**
		 * @private
		 */
		_addResizeListener: function () {
			goog.events.listen(document, imageApp.events.EventType.RESIZE_OBJECT, goog.bind(function(event) {
				var command = new ResizeCommand(event.detail.model, event.detail.frame);
				this._history.recordAction(command);
			}, this));
		},

		/**
		 * @private
		 */
		_addMoveListener: function () {
			goog.events.listen(document, imageApp.events.EventType.MOVE_OBJECT, goog.bind(function(event) {
				var command = new MoveCommand(event.detail.model, event.detail.pos);
				this._history.recordAction(command);
			}, this));
		},

		_addTextListener: function () {
			goog.events.listen(this._view, imageApp.events.EventType.APPEND_TEXT, goog.bind(function (event) {
				var text = event.detail.text;
				var command = new AppendTextCommand(event.detail.model, text);
				this._history.recordAction(command);
			}, this));
			

		},

		/**
		 * @param {Image} elem
		 * @private
		 */
		_onLoadImage: function(elem) {
			var imageModel = this._model.createImage(new goog.math.Size(elem.naturalWidth, elem.naturalHeight), elem.src);

			var command = new AddObjectCommand(this._objectCollection, imageModel);
			this._history.recordAction(command);

			goog.style.setStyle(document.documentElement, "cursor", "default");
		},

		deleteObject: function() {
			var key = this._view.getKeySelectedObject();
			if (key !== null)
			{
				var object = this._objectCollection.getObjectOnKey(key);
				if (!object.isDeleted())
				{
					return;
				}
				var command = new DeleteCommand(this._objectCollection, object);
				this._history.recordAction(command);
			}
		}
	});
});