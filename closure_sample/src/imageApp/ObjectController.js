goog.provide("imageApp.ObjectController");


goog.require("imageApp.command.MoveCommand");
goog.require("imageApp.command.AddImageCommand");
goog.require("imageApp.command.DeleteCommand");
goog.require("imageApp.command.ResizeCommand");
goog.require("imageApp.command.AddTextAreaCommand");

goog.scope(function() {
	var MoveCommand = imageApp.command.MoveCommand;
	var AddImageCommand = imageApp.command.AddImageCommand;
	var DeleteCommand = imageApp.command.DeleteCommand;
	var ResizeCommand = imageApp.command.ResizeCommand;
	var AddTextAreaCommand = imageApp.command.AddTextAreaCommand;

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
		},

		addTextArea: function () {
			var textAreaModel = this._model.createTextArea();

			var command = new AddTextAreaCommand(this._objectCollection, textAreaModel);
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
		 * @param {Image} elem
		 * @private
		 */
		_onLoadImage: function(elem) {
			var imageModel = this._model.createImage(new goog.math.Size(elem.naturalWidth, elem.naturalHeight), elem.src);

			var command = new AddImageCommand(this._objectCollection, imageModel);
			this._history.recordAction(command);

			goog.style.setStyle(document.documentElement, "cursor", "default");
		},

		deleteObject: function() {
			var key = this._view.getKeySelectedObject();
			if (key !== null)
			{
				var object = this._objectCollection.getObjectOnKey(key);
				var command = new DeleteCommand(this._objectCollection, object);
				this._history.recordAction(command);
			}
		}
	});
});