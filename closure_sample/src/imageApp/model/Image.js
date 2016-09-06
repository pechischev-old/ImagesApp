goog.provide("imageApp.model.Image");

goog.require("imageApp.model.Object");

goog.scope(function(){
	/** @const {!goog.math.Size} */
	const MAX_SIZE = new goog.math.Size(512, 256);
	
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
		},

		/**
		 * @inheritDoc
		 */
		getType: function () {
			return "image";
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
		}
	});
});