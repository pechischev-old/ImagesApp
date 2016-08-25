goog.provide("model.ImagesModel");

goog.require("model.Image");

goog.scope(function () {

	/** @const {!goog.math.Size} */
	const MAX_SIZE = new goog.math.Size(512, 256);

	/**
	 * @constructor
	 */
	model.ImagesModel = goog.defineClass(null, {
		constructor: function () {

			/**
			 * @private {Array<model.Image>}
			 */
			this._imagesModel = [];
		},

		/**
		 * @param {!goog.math.Size} naturalSize
		 * @return {model.Image}
		 */
		createImage: function (naturalSize) {
			var size = this._getCalculatingAppropriateSize(naturalSize);
			return new model.Image(new goog.math.Rect(50, 50, size.width, size.height));
		},

		/**
		 * @param {number} index
		 * @return {model.Image}
		 */
		removeImageOnIndex: function(index) {
			index = (index == -1) ? (this._imagesModel.length - 1) : index;
			if (index < 0 && index >= this._imagesModel.length )
			{
				throw new Error("index is out of range array");
			}
			return this._imagesModel.splice(index, 1)[0];
		},

		/**
		 * @param {model.Image} image
		 * @param {number} index
		 */
		insertImageOnIndex: function (image, index) {
			index = (index == -1) ? this._imagesModel.length : index;
			this._imagesModel.splice(index, 0, image);
		},

		/**
		 * @param {!goog.math.Size} size
		 * @return {!goog.math.Size}
		 * @private
		 */
		_getCalculatingAppropriateSize: function(size) {
			var width = size.width;
			var height = size.height;
			var coeff = ( width > height) ? width / MAX_SIZE.width : height / MAX_SIZE.height;
			width = (width > MAX_SIZE.width) ? width / coeff : width;
			height = (height > MAX_SIZE.height) ? height / coeff : height;
			return new goog.math.Size(width, height);
		},

		outputLog: function () {
			for (var i = 0; i < this._imagesModel.length; ++i) {
				this._imagesModel[i].outLog(i);
			}
		}

	});
});