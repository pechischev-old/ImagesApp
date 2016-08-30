goog.provide("imageApp.command.AddTextAreaCommand");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.model.ObjectsModel");

goog.scope(function() {

	/**
	 * @param {imageApp.model.ObjectsModel} model
	 * @param {imageApp.model.TextArea} lastModel
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AddTextAreaCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.ObjectsModel} model
		 * @param {!imageApp.model.TextArea} lastModel
		 */
		constructor: function (model, lastModel) {
			/** @private {imageApp.model.ObjectsModel} */
			this._model = model;

			/** @private {!imageApp.model.TextArea} */
			this._lastModel = lastModel;

			/** @type {CustomEvent} */
			/*this._deleteEvent = new CustomEvent("delete", {
				detail: {
					index: -1
				}
			});*/
			/** @type {CustomEvent} */
			/*this._appendEvent = new CustomEvent("append", {
				detail: {
					model: this._lastModel,
					index: -1
				}
			});*/
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._model.insertImageOnIndex(this._lastModel, -1);
			//document.dispatchEvent(this._appendEvent);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._model.removeImageOnIndex(-1);
			//document.dispatchEvent(this._deleteEvent);

		}
	});
});