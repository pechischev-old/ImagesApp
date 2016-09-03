goog.provide("imageApp.AppModel");


goog.require("imageApp.model.Image");
goog.require("imageApp.model.TextArea");

goog.scope(function () {
	/** @const {!goog.math.Size} */
	const MIN_SIZE = new goog.math.Size(100, 100);

	/**
	 * @constructor
	 */
	imageApp.AppModel = goog.defineClass(null, {
		constructor: function () {
		},

		/**
		 * @param {!goog.math.Size} naturalSize
		 * @param {string} path
		 * @return {!imageApp.model.Image}
		 */
		createImage: function (naturalSize, path) {
			return new imageApp.model.Image(new goog.math.Rect(50, 50, naturalSize.width, naturalSize.height), path);
		},

		/**
		 * @returns {!imageApp.model.TextArea}
		 */
		createTextArea: function() {
			return new imageApp.model.TextArea(new goog.math.Rect(50, 50, 200, 50));
		},

		/**
		 * @param {!goog.math.Rect} frame
		 * @param {!goog.math.Coordinate} oldPos
		 * @returns {!goog.math.Rect}
		 */
		getMinFrame: function (frame, oldPos) {
			frame.left = (frame.width < MIN_SIZE.width) ? oldPos.x : frame.left;
			frame.top = (frame.height < MIN_SIZE.height) ? oldPos.y : frame.top;
			frame.width = (frame.width < MIN_SIZE.width) ? MIN_SIZE.width : frame.width;
			frame.height = (frame.height < MIN_SIZE.height) ? MIN_SIZE.height : frame.height;
			return frame;
		}
		

	});
});