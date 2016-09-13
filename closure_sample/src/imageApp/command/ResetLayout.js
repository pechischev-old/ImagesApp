goog.provide("imageApp.command.ResetLayout");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.layout.LayoutControl");

goog.scope(function() {

	/**
	 * @param {imageApp.layout.LayoutControl} layoutControl
	 * @param {string} type
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.ResetLayout = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.layout.LayoutControl} layoutControl
		 * @param {string} type
		 */
		constructor: function (layoutControl, type) {
			goog.base(this);
			/** @private {imageApp.layout.LayoutControl} */
			this._layoutControl = layoutControl;

			/** @private {string} */
			this._newType = this._layoutControl.getTypeLayout();

			/** @private {string} */
			this._oldType = type;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._layoutControl.setTypeLayout(this._oldType);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._layoutControl.setTypeLayout(this._newType);
		}
	});
});