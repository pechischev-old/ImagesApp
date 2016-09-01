goog.provide("imageApp.command.AddTextAreaCommand");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.AppModel");

goog.scope(function() {

	/**
	 * @param {imageApp.AppModel} model
	 * @param {imageApp.model.TextArea} lastModel
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AddTextAreaCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.AppModel} model
		 * @param {!imageApp.model.TextArea} lastModel
		 */
		constructor: function (model, lastModel) {
			/** @private {imageApp.AppModel} */
			this._model = model;

			/** @private {!imageApp.model.TextArea} */
			this._lastModel = lastModel;

			/** @type {CustomEvent} */
			this._deleteEvent = new CustomEvent("delete", {
				detail: {
					model: this._lastModel
				}
			});
			/** @type {CustomEvent} */
			this._appendEvent = new CustomEvent("append", {
				detail: {
					model: this._lastModel
				}
			});
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._model.insertObjectOnIndex(this._lastModel, -1);
			document.dispatchEvent(this._appendEvent);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._model.removeObjectOnIndex(-1);
			document.dispatchEvent(this._deleteEvent);

		}
	});
});