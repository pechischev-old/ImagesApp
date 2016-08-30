goog.provide("imageApp.command.MoveCommand");

goog.require("imageApp.command.AbstractAction");
goog.require("imageApp.model.Object");

goog.scope(function () {

	/**
	 * @param {imageApp.model.Object} objectModel
	 * @param {!goog.math.Coordinate} mousePos
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.MoveCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.Object} objectModel
		 * @param {!goog.math.Coordinate} mousePos
		 */
		constructor: function(objectModel, mousePos) {
			goog.base(this);
			/**
			 * @private {imageApp.model.Object}
			 */
			this._object = objectModel;
			/**
			 * @private {!goog.math.Coordinate}
			 */
			this._oldPos = objectModel.getFrame().getTopLeft();
			/** @private {!goog.math.Coordinate} */
			this._mousePos = mousePos;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._object.setPosition(this._mousePos);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._object.setPosition(this._oldPos);
		}
	});
});