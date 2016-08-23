goog.provide("command.MoveCommand");

goog.require("command.AbstractAction");
goog.require("model.Image");

goog.scope(function () {

	/**
	 * @param {model.Image} shapeModel
	 * @param {!goog.math.Coordinate} mousePos
	 * @extends {command.AbstractAction}
	 * @constructor
	 */
	command.MoveCommand = goog.defineClass(command.AbstractAction, {
		/**
		 * @param {model.Image} shapeModel
		 * @param {!goog.math.Coordinate} mousePos
		 */
		constructor: function(shapeModel, mousePos) {
			goog.base(this);
			/**
			 * @type {model.Image}
			 * @private
			 */
			this._shapeModel = shapeModel;
			/**
			 * @private {!goog.math.Rect}
			 */
			this._oldFrame = shapeModel.getFrame();
			/** @private {!goog.math.Coordinate} */
			this._mousePos = mousePos;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			var frame = new goog.math.Rect(this._mousePos.x, this._mousePos.y, this._oldFrame.width, this._oldFrame.height);
			this._shapeModel.setFrame(frame);
			//this._shapeModel.move(this._mousePos);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._shapeModel.setFrame(this._oldFrame);
		}
	});
});