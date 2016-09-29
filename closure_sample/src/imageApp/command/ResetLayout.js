goog.provide("imageApp.command.ResetLayout");

goog.require("imageApp.command.AbstractAction");


goog.scope(function() {

	/**
	 * @param {imageApp.layout.LayoutController} layoutController
	 * @param {boolean} isAlign
	 * @param {boolean} isNewAlign
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.ResetLayout = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.layout.LayoutController} layoutController
		 * @param {boolean} isAlign
		 */
		constructor: function (layoutController, isAlign) {
			goog.base(this);
			/** @private {imageApp.layout.LayoutController} */
			this._layoutController = layoutController;
			/** @private {boolean} */
			this._newIsAlign = isAlign;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._layoutController.setAutoAlignment(this._newIsAlign);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._layoutController.setAutoAlignment(!this._newIsAlign);
		}
	});
});