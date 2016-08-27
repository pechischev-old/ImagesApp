goog.provide("imageApp.command.AddImageCommand");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.model.ImagesModel");

goog.scope(function() {

	/**
	 * @param {imageApp.model.ImagesModel} imagesModel
	 * @param {imageApp.model.Image} lastModel
 	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AddImageCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.ImagesModel} model
		 * @param {imageApp.model.Image} lastModel
		 */
		constructor: function (model, lastModel) {
			/** @private {imageApp.model.ImagesModel} */
			this._model = model;
			
			/** @private {imageApp.model.Image} */
			this._lastModel = lastModel;

			/** @type {CustomEvent} */
			this._deleteEvent = new CustomEvent("delete", {
				detail: {
					index: -1
				}
			});
			/** @type {CustomEvent} */
			this._appendEvent = new CustomEvent("append", {
				detail: {
					model: this._lastModel,
					index: -1
				}
			});
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._model.insertImageOnIndex(this._lastModel, -1);
			
			document.dispatchEvent(this._appendEvent);
		},

		/**
		 * @inheritDoc
	 	 */
		_doUnexecute: function () {
			this._model.removeImageOnIndex(-1);
			document.dispatchEvent(this._deleteEvent);
			
		}
	});
});