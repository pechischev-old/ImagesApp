goog.provide("imageApp.AppModel");


goog.require("imageApp.model.Image");
goog.require("imageApp.model.TextArea");

goog.scope(function () {
	

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
		}

	});
});