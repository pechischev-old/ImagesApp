goog.provide("imageApp.command.SelectTypeLayout");

goog.require("imageApp.command.AbstractAction");


goog.scope(function() {

	/**
	 * @param {imageApp.layout.LayoutController} layoutControl
	 * @param {string} type
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.SelectTypeLayout = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.layout.LayoutController} layoutControl
		 * @param {string} type
		 */
		constructor: function (layoutControl, type) {
			goog.base(this);
			/** @private {imageApp.layout.LayoutController} */
			this._layoutController = layoutControl;

			/** @private {string} */
			this._newType = type;

			/** @private {string} */
			this._oldType = this._layoutController.getTypeLayout();
			//console.log("new type: " + this._newType );
			//console.log("old type: " + this._oldType );
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._layoutController.setTypeLayout(this._newType);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._layoutController.setTypeLayout(this._oldType);
		}
	});
});