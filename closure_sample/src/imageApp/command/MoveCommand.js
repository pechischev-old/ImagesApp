goog.provide("imageApp.command.MoveCommand");

goog.require("imageApp.command.AbstractAction");
goog.require("imageApp.model.Image");

goog.scope(function () {

	/**
	 * @param {imageApp.model.Image} shapeModel
	 * @param {!goog.math.Coordinate} mousePos
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.MoveCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.Image} shapeModel
		 * @param {!goog.math.Coordinate} mousePos
		 */
		constructor: function(shapeModel, mousePos) {
			goog.base(this);
			/**
			 * @private {imageApp.model.Image}
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