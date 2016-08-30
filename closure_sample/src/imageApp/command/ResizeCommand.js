goog.provide("imageApp.command.ResizeCommand");

goog.require("imageApp.command.AbstractAction");
goog.require("imageApp.model.Object");

goog.scope(function () {

	/**
	 * @param {imageApp.model.Object} object
	 * @param {!goog.math.Rect} newFrame
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.ResizeCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.Object} object
		 * @param {!goog.math.Rect} newFrame
		 */
		constructor: function(object, newFrame) {
			goog.base(this);
			/** @private {imageApp.model.Object} */
			this._object = object;
			/** @private {!goog.math.Rect} */
			this._oldFrame = object.getFrame();
			/** @private {!goog.math.Rect} */
			this._newFrame = newFrame;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._object.setFrame(this._newFrame);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._object.setFrame(this._oldFrame);
		}
	});
});