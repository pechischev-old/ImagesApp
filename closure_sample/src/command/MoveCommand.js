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
			this._shapeModel = shapeModel;
			this._oldPos = shapeModel.getFrame().getTopLeft();

			this._mousePos = mousePos;
		},

		/**
		 * @override
		 */
		doExecute: function() {
			this._shapeModel.move(this._mousePos);
		},

		/**
		 * @override
		 */
		doUnexecute: function () {
			this._shapeModel.move(this._oldPos);
		}
	});
});