goog.provide("imageApp.command.SelectTypeLayout");

goog.require("imageApp.command.AbstractAction");

goog.require("imageApp.layout.LayoutControl");

goog.scope(function() {

	/**
	 * @param {imageApp.layout.LayoutControl} layoutControl
	 * @param {string} type
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.SelectTypeLayout = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.layout.LayoutControl} layoutControl
		 * @param {string} type
		 */
		constructor: function (layoutControl, type) {
			goog.base(this);
			/** @private {imageApp.layout.LayoutControl} */
			this._layoutControl = layoutControl;

			/** @private {string} */
			this._newType = type;

			/** @private {string} */
			this._oldType = this._layoutControl.getTypeLayout();
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			console.log(this._newType);
			this._layoutControl.setTypeLayout(this._newType);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			console.log(this._oldType);
			this._layoutControl.setTypeLayout(this._oldType);
		}
	});
});