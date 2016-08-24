goog.provide("command.ResizeCommand");

goog.require("command.AbstractAction");
goog.require("model.Image");

goog.scope(function () {

	/**
	 * @param {model.Image} shapeModel
	 * @param {!goog.math.Rect} newFrame
	 * @extends {command.AbstractAction}
	 * @constructor
	 */
	command.ResizeCommand = goog.defineClass(command.AbstractAction, {
		/**
		 * @param {model.Image} shapeModel
		 * @param {!goog.math.Rect} newFrame
		 */
		constructor: function(shapeModel, newFrame) {
			goog.base(this);
			/** @private {model.Image} */
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