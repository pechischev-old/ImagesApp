goog.provide("command.AddImageCommand");

goog.require("command.AbstractAction");

goog.scope(function() {

	/**
	 * @param {model.ImagesModel} imagesModel
	 * @param {view.ImagesView} imagesView
	 * @param {model.Image} lastModel
	 * @param {view.ImageView} lastView
 	 * @extends {command.AbstractAction}
	 * @constructor
	 */
	command.AddImageCommand = goog.defineClass(command.AbstractAction, {
		/**
		 * @param {model.ImagesModel} model
		 * @param {view.ImagesView} view
		 * @param {model.Image} lastModel
		 * @param {view.ImageView} lastView
		 */
		constructor: function (model, view, lastModel, lastView) {
			/** @private {model.ImagesModel} */
			this._model = model;
			/** @private {view.ImagesView} */
			this._view = view;
			/** @private {model.Image} */
			this._lastModel = lastModel;
			/** @private {view.ImageView} */
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