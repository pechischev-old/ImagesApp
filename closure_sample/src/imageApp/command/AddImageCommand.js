goog.provide("imageApp.command.AddImageCommand");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.ObjectCollection");

goog.scope(function() {

	/**
	 * @param {imageApp.ObjectCollection} collection
	 * @param {!imageApp.model.Image} lastModel
 	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AddImageCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.ObjectCollection} collection
		 * @param {!imageApp.model.Image} lastModel
		 */
		constructor: function (collection, lastModel) {
			goog.base(this);
			/** @private {imageApp.ObjectCollection} */
			this._objectCollection = collection;
			
			/** @private {!imageApp.model.Image} */
			this._lastModel = lastModel;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._objectCollection.appendObject(this._lastModel);
		},

		/**
		 * @inheritDoc
	 	 */
		_doUnexecute: function () {
			this._objectCollection.removeObject(this._lastModel);
		}
	});
});