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
	 * @param {imageApp.AppModel} models
	 * @param {imageApp.command.History} history
	 * @param {imageApp.ObjectCollection} collection
	 * @constructor
	 */
	imageApp.ObjectController = goog.defineClass(null, {
		/**
		 * @param {imageApp.AppModel} models
		 * @param {imageApp.command.History} history
		 * @param {imageApp.ObjectCollection} collection
		 */
		constructor: function(models, history, collection) {
			/** @private {imageApp.AppModel} */
			this._object = models;
			/** @private {imageApp.command.History} */
			this._history = history;
			/** @private {imageApp.ObjectCollection} */
			this._objectCollection = collection;

			document.addEventListener("append", goog.bind(function (event) {

			 var imageModel = event.detail.model;
			 this._objectCollection.appendObject(imageModel);
			 //this._addHandlers(imageModel, imageView);

			 }, this), false);
			

			 document.addEventListener("delete", goog.bind(function (event) {
			 this._objectCollection.removeObject(event.detail.model);
			 }, this), false);
		},

		addTextArea: function () {
			var textAreaModel = this._object.createTextArea();

			var command = new AddTextAreaCommand(this._object, textAreaModel);
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

			var imageModel = this._object.createImage(new goog.math.Size(elem.naturalWidth, elem.naturalHeight), elem.src);

			var command = new AddImageCommand(this._object, imageModel);
			this._history.recordAction(command);

			goog.style.setStyle(document.documentElement, "cursor", "default");

		},

		deleteObject: function() {
			var object = this._objectCollection.getSelectingObject();
			/*var index = this._objectsView.getIndexSelectingImage();
			if (index !== null)
			{
				var command = new DeleteCommand(this._object, index);
				this._history.recordAction(command);
			}*/
		}
	});
});