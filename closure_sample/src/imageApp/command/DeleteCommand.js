goog.provide("imageApp.command.DeleteCommand");

goog.require("imageApp.command.AbstractAction");


goog.scope(function () {

	/**
	 * @param {imageApp.model.ImagesModel} model
	 * @param {!number} index
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.DeleteCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.ImagesModel} model
		 * @param {!number} index
		 */
		constructor: function(model, index) {
			goog.base(this);
			/**
			 * @private {imageApp.model.ImagesModel}
			 */
			this._model = model;

			/**
			 * @private {!number}
			 */
			this._index = index;

			/** @private {?imageApp.model.Image} */
			this._imageModel = null;

		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {

			this._imageModel = this._model.removeImageOnIndex(this._index);
			var event = new CustomEvent("delete", {
				"detail": {
					"index": this._index
				}
			});
			document.dispatchEvent(event);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._model.insertImageOnIndex(this._imageModel, this._index);
			var event = new CustomEvent("append", {
				"detail": {
					"model": this._imageModel,
					"index": this._index
				}
			});
			document.dispatchEvent(event);
		}
	});
});