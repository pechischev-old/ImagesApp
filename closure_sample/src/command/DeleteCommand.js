goog.provide("command.DeleteCommand");

goog.require("command.AbstractAction");


goog.scope(function () {

	/**
	 * @param {model.ImagesModel} model
	 * @param {view.ImagesView} view
	 * @param {!number} index
	 * @extends {command.AbstractAction}
	 * @constructor
	 */
	command.DeleteCommand = goog.defineClass(command.AbstractAction, {
		/**
		 * @param {model.ImagesModel} model
		 * @param {view.ImagesView} view
		 * @param {!number} index
		 */
		constructor: function(model, view, index) {
			goog.base(this);
			/**
			 * @private {model.ImagesModel}
			 */
			this._model = model;
			/**
			 * @private {view.ImagesView}
			 */
			this._view = view;

			/**
			 * @private {!number}
			 */
			this._index = index;
			/** @private {?view.ImageView} */
			this._imageView = null;
			/** @private {?model.Image} */
			this._imageModel = null;

		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._imageView = this._view.removeImageOnIndex(this._index);
			this._imageModel = this._model.removeImageOnIndex(this._index);
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