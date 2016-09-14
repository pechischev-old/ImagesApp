goog.provide("imageApp.command.AddMediaCommand");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.ObjectCollection");

goog.scope(function() {

	/**
	 * @param {imageApp.layout.LayoutControl} layoutControl
	 * @param {imageApp.ObjectCollection} collection
	 * @param {imageApp.model.TextArea} lastModel
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AddMediaCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.layout.LayoutControl} layoutControl
		 * @param {imageApp.ObjectCollection} collection
		 * @param {imageApp.model.TextArea} lastModel
		 */
		constructor: function (layoutControl, collection, lastModel) {
			goog.base(this);
			/** @private {imageApp.layout.LayoutControl} */
			this._layoutControl = layoutControl;

			/** @private {imageApp.ObjectCollection} */
			this._objectCollection = collection;

			/** @private {!imageApp.model.TextArea} */
			this._lastModel = lastModel;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._objectCollection.appendObject(this._lastModel);
			this._layoutControl.initMediaLayout(this._lastModel);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._objectCollection.removeObject(this._lastModel);
			this._layoutControl.removeMedia();
		}
	});
});