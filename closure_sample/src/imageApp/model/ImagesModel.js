goog.provide("imageApp.model.ImagesModel");

goog.require("imageApp.model.Image");

goog.scope(function () {

	/** @const {!goog.math.Size} */
	const MAX_SIZE = new goog.math.Size(512, 256);
	/** @const {!goog.math.Size} */
	const MIN_SIZE = new goog.math.Size(100, 100);
	/**
	 * @constructor
	 */
	imageApp.model.ImagesModel = goog.defineClass(null, {
		constructor: function () {

			/**
			 * @private {Array<imageApp.model.Image>}
			 */
			this._imagesModel = [];

			/** @private {boolean} */
			this._isChange = false;
		},

		/**
		 * @param {!goog.math.Size} naturalSize
		 * @param {string} path
		 * @return {imageApp.model.Image}
		 */
		createImage: function (naturalSize, path) {
			var size = this._getCalculatingAppropriateSize(naturalSize);
			return new imageApp.model.Image(new goog.math.Rect(50, 50, size.width, size.height), path);
		},

		/**
		 * @param {number} index
		 * @return {imageApp.model.Image}
		 */
		removeImageOnIndex: function(index) {
			if (index == -1) 
			{
				this._isChange = true;
				return this._imagesModel.pop();
			}
			else if (index < 0 && index >= this._imagesModel.length )
			{
				throw new Error("index is out of range array");
			}
			this._isChange = true;
			return this._imagesModel.splice(index, 1)[0];
		},

		/**
		 * @param {imageApp.model.Image} image
		 * @param {number} index
		 */
		insertImageOnIndex: function (image, index) {
			index = (index == -1) ? this._imagesModel.length : index;
			this._imagesModel.splice(index, 0, image);
			this._isChange = true;
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
		},

		outputLog: function () {
			this._outLog();
			for (var i = 0; i < this._imagesModel.length; ++i) {
				this._imagesModel[i].outLog(i);
			}
		},

		/**
		 * @private
		 */
		_outLog: function () {
			if (this._isChange)
			{
				console.log("The number of models: " + this._imagesModel.length);
				this._isChange = false;
			}
		}

	});
});