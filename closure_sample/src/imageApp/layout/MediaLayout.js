goog.provide("imageApp.layout.MediaLayout");

goog.require("imageApp.layout.Layout");

goog.scope(function () {


	/**
	 * @param {imageApp.model.Object} object
	 * @extends {imageApp.layout.Layout}
	 * @constructor
	 */
	imageApp.layout.MediaLayout = goog.defineClass(imageApp.layout.Layout, {
		/**
		 * @param {imageApp.model.Object} object
		 */
		constructor: function (object) {
			goog.base(this, object);
			/** @private {!goog.math.Size} */
			this._firstSize = object.getFrame().getSize();
		},

		/**
		 * @return {!goog.math.Size}
		 */
		getFirstSize: function () {
			return this._firstSize;
		}
	});
});