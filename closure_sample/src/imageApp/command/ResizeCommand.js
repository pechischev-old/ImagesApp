goog.provide("imageApp.command.ResizeCommand");

goog.require("imageApp.command.AbstractAction");
goog.require("imageApp.model.Image");

goog.scope(function () {

	/**
	 * @param {imageApp.model.Image} shapeModel
	 * @param {!goog.math.Rect} newFrame
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.ResizeCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.Image} shapeModel
		 * @param {!goog.math.Rect} newFrame
		 */
		constructor: function(shapeModel, newFrame) {
			goog.base(this);
			/** @private {imageApp.model.Image} */
			this._shapeModel = shapeModel;
			/** @private {!goog.math.Rect} */
			this._oldFrame = shapeModel.getFrame();
			/** @private {!goog.math.Rect} */
			this._newFrame = newFrame;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._shapeModel.setFrame(this._newFrame);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._shapeModel.setFrame(this._oldFrame);
		}
	});
});