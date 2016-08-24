goog.provide("command.DeleteCommand");

goog.require("command.AbstractAction");


goog.scope(function () {

	/**
	 * @param {AppModel} model
	 * @param {AppView} view
	 * @param {!number} index
	 * @extends {command.AbstractAction}
	 * @constructor
	 */
	command.DeleteCommand = goog.defineClass(command.AbstractAction, {
		/**
		 * @param {AppModel} model
		 * @param {AppView} view
		 * @param {!number} index
		 */
		constructor: function(model, view, index) {
			goog.base(this);
			/**
			 * @private {AppModel}
			 */
			this._model = model;
			/**
			 * @private {AppView}
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