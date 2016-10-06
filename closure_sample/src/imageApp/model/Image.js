goog.provide("imageApp.model.Image");

goog.require("imageApp.model.Object");
goog.require("imageApp.Constants");

goog.scope(function(){
	/** @const {!goog.math.Size} */
	const MAX_SIZE = new goog.math.Size(512, 256);
	const MIN_SIZE = new goog.math.Size(100, 100);
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
			var newSize = this._getCalculatingAppropriateSize(frame.getSize());
			goog.base(this, new goog.math.Rect(frame.left, frame.top, newSize.width, newSize.height));
			this._path = path;
			/** @private {!goog.math.Size} */
			this._minSize = (MIN_SIZE.width > frame.width || MIN_SIZE.height > frame.height) ? frame.getSize() : MIN_SIZE;
		},

		/**
		 * @inheritDoc
		 */
		getType: function () {
			return imageApp.Constants.IMAGE;
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
		 * @return {string}
		 */
		getPath: function () {
			return this._path;
		},


		/**
		 * @inheritDoc
		 */
		_calculateMinSize: function(frame) {
			frame.height = this._minSize.height > frame.height ?  this._minSize.height : frame.height;
			frame.width = this._minSize.width > frame.width ?  this._minSize.width : frame.width;
		}
	});
});