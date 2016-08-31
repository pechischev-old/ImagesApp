goog.provide("imageApp.command.AddImageCommand");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.AppModel");

goog.scope(function() {

	/**
	 * @param {imageApp.AppModel} objectModel
	 * @param {!imageApp.model.Image} lastModel
 	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AddImageCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.AppModel} model
		 * @param {!imageApp.model.Image} lastModel
		 */
		constructor: function (model, lastModel) {
			/** @private {imageApp.AppModel} */
			this._model = model;
			
			/** @private {!imageApp.model.Image} */
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
			this._model.insertObjectOnIndex(this._lastModel, -1);
			
			//document.dispatchEvent(this._appendEvent);
		},

		/**
		 * @inheritDoc
	 	 */
		_doUnexecute: function () {
			this._model.removeObjectOnIndex(-1);
			//document.dispatchEvent(this._deleteEvent);
			
		}
	});
});