goog.provide("imageApp.command.AddMediaCommand");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.ObjectCollection");

goog.scope(function() {

	/**
	 * @param {imageApp.layout.LayoutController} layoutControl
	 * @param {imageApp.ObjectCollection} collection
	 * @param {imageApp.model.Object} lastModel
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AddMediaCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.layout.LayoutController} layoutControl
		 * @param {imageApp.ObjectCollection} collection
		 * @param {imageApp.model.Object} lastModel
		 */
		constructor: function (layoutControl, collection, lastModel) {
			goog.base(this);
			/** @private {imageApp.layout.LayoutController} */
			this._layoutController = layoutControl;

			/** @private {imageApp.ObjectCollection} */
			this._objectCollection = collection;

			/** @private {imageApp.model.Object} */
			this._lastModel = lastModel;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._objectCollection.appendObject(this._lastModel);
			this._layoutController.initMediaLayout(this._lastModel);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._objectCollection.removeObject(this._lastModel);
			this._layoutController.removeMediaLayout();
		}
	});
});