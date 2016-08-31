goog.provide("imageApp.command.DeleteCommand");

goog.require("imageApp.command.AbstractAction");


goog.scope(function () {

	/**
	 * @param {imageApp.AppModel} model
	 * @param {!number} index
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.DeleteCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.AppModel} model
		 * @param {!number} index
		 */
		constructor: function(model, index) {
			goog.base(this);
			/** @private {imageApp.AppModel} */
			this._model = model;

			/** @private {!number} */
			this._index = index;

			/** @private {?imageApp.model.Object} */
			this._object = null;

		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			
			this._object = this._model.removeObjectOnIndex(this._index);
			/*var event = new CustomEvent("delete", {
				detail: {
					index: this._index
				}
			});
			document.dispatchEvent(event);*/
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._model.insertObjectOnIndex(this._object, this._index);
			/*var event = new CustomEvent("append", {
				detail: {
					model: this._imageModel,
					index: this._index
				}
			});
			document.dispatchEvent(event);*/
		}
	});
});