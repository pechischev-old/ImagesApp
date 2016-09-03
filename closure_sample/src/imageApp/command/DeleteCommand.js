goog.provide("imageApp.command.DeleteCommand");

goog.require("imageApp.command.AbstractAction");


goog.scope(function () {

	/**
	 * @param {imageApp.ObjectCollection} model
	 * @param {imageApp.model.Object} object
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.DeleteCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.ObjectCollection} model
		 * @param {imageApp.model.Object} object
		 */
		constructor: function(model, object) {
			goog.base(this);
			/** @private {imageApp.ObjectCollection} */
			this._objectCollection = model;

			/** @private {imageApp.model.Object} */
			this._object = object;

		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._objectCollection.removeObject(this._object);
			
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._objectCollection.appendObject(this._object);
		}
	});
});