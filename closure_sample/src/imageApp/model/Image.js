goog.provide("imageApp.model.Image");

goog.require("imageApp.model.Object");

goog.scope(function(){

	/**
	  * @extends {imageApp.model.Object}
	  * @param {!goog.math.Rect} frame
	  * @param {string} path
	  * @constructor
	  */
	imageApp.model.Image = goog.defineClass(imageApp.model.Object, {
		/**
		 * @param {!goog.math.Rect} frame
		 * @param {string} path
		 */
		constructor: function(frame, path) {
			goog.base(this, frame);
			this._path = path;
		},

		/**
		 * @return {string}
		 */
		getPath: function () {
			return this._path;
		},

		/**
		 * @inheritDoc
		 */
		_appendProperties: function () {
			return "image";
		}
	});
});