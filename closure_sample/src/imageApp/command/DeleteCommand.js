goog.provide("imageApp.command.DeleteCommand");

goog.require("imageApp.command.AbstractAction");


goog.scope(function () {

	/**
	 * @param {imageApp.model.ImagesModel} model
	 * @param {imageApp.view.ImagesView} view
	 * @param {!number} index
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.DeleteCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.ImagesModel} model
		 * @param {imageApp.view.ImagesView} view
		 * @param {!number} index
		 */
		constructor: function(model, view, index) {
			goog.base(this);
			/**
			 * @private {imageApp.model.ImagesModel}
			 */
			this._model = model;
			/**
			 * @private {imageApp.view.ImagesView}
			 */
			this._view = view;

			/**
			 * @private {!number}
			 */
			this._index = index;
			/** @private {?imageApp.view.ImageView} */
			this._imageView = null;
			/** @private {?imageApp.model.Image} */
			this._imageModel = null;

		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._imageView = this._view.removeImageOnIndex(this._index);
			this._imageModel = this._model.removeImageOnIndex(this._index);
			this._imageView.setVisibleBorder(false);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._model.insertImageOnIndex(this._imageModel, this._index);
			this._view.insertImageOnIndex(this._imageView, this._index);
		}
	});
});