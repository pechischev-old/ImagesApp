goog.provide("AppModel");


goog.require("model.Image");

goog.scope(function () {

	/** @const {!goog.math.Size} */
	const ALLOWABLE_SIZE = new goog.math.Size(512, 256);
	/**
	 * @constructor
	 */
	AppModel = goog.defineClass(null, {
		constructor: function () {
			/**
			 * @private {Array<model.Image>}
			 */
			this._images = [];
		},

		/**
		 * @param {!goog.math.Size} naturalSize
		 * @return {model.Image}
		 */
		addImage: function (naturalSize) {
			var size = this._getCalculatingAppropriateSize(naturalSize);
			/** @type {model.Image} */
			var image = new model.Image(new goog.math.Rect(50, 50, size.width, size.height));
			this._images.push(image);
			return image;
		},

		/**
		 * @param {!number} index
		 * @return {model.Image}
		 */
		getImageOfIndex: function (index) {
			if (this._images.length <= index || index < 0) {
				throw new Error("out of range");
			}
			return this._images[index];
		},

		outputLog: function () {
			for (var i = 0; i < this._images.length; ++i) {
				this._images[i].outLog(i);
			}
		},

		/**
		 * @param {!goog.math.Size} size
		 * @return {!goog.math.Size}
		 * @private
		 */
		_getCalculatingAppropriateSize: function(size) {
			var width = size.width;
			var height = size.height;
			var coeff = ( width > height) ? width / ALLOWABLE_SIZE.width : height / ALLOWABLE_SIZE.height;
			width = (width > ALLOWABLE_SIZE.width) ? width / coeff : width;
			height = (height > ALLOWABLE_SIZE.height) ? height / coeff : height;
			return new goog.math.Size(width, height);
		}
	});
});