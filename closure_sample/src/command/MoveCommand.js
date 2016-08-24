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
			 * @private {model.Image}
			 */
			this._shapeModel = shapeModel;
			/**
			 * @private {!goog.math.Coordinate}
			 */
			this._oldPos = shapeModel.getFrame().getTopLeft();
			/** @private {!goog.math.Coordinate} */
			this._mousePos = mousePos;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._shapeModel.setPosition(this._mousePos);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._shapeModel.setPosition(this._oldPos);
		}
	});
});