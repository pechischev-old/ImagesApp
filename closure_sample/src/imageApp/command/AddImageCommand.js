goog.provide("imageApp.command.AddImageCommand");

goog.require("imageApp.command.AbstractAction");

goog.scope(function() {

	/**
	 * @param {imageApp.model.ImagesModel} imagesModel
	 * @param {imageApp.view.ImagesView} imagesView
	 * @param {imageApp.model.Image} lastModel
	 * @param {imageApp.view.ImageView} lastView
 	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AddImageCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.ImagesModel} model
		 * @param {imageApp.view.ImagesView} view
		 * @param {imageApp.model.Image} lastModel
		 * @param {imageApp.view.ImageView} lastView
		 */
		constructor: function (model, view, lastModel, lastView) {
			/** @private {imageApp.model.ImagesModel} */
			this._model = model;
			/** @private {imageApp.view.ImagesView} */
			this._view = view;
			/** @private {imageApp.model.Image} */
			this._lastModel = lastModel;
			/** @private {imageApp.view.ImageView} */
			this._lastView = lastView;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._model.insertImageOnIndex(this._lastModel, -1);
			this._view.insertImageOnIndex(this._lastView, -1);
		},

		/**
		 * @inheritDoc
	 	 */
		_doUnexecute: function () {
			this._model.removeImageOnIndex(-1);
			this._view.removeImageOnIndex(-1);
			this._lastView.setVisibleBorder(false);
		}
	});
});