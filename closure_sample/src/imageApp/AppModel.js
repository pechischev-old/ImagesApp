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
			/** @private {Array<imageApp.model.Object>} */
			this._object = [];

			/** @private {boolean} */
			this._isChange = false;
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
			return new imageApp.model.TextArea(new goog.math.Rect(50, 50, 200, 200));
		},

		/**
		 * @param {number} index
		 * @return {imageApp.model.Object}
		 */
		removeObjectOnIndex: function(index) {
			if (index == -1)
			{
				this._isChange = true;
				return this._object.pop();
			}
			else if (index < 0 && index >= this._object.length )
			{
				throw new Error("index is out of range array");
			}
			this._isChange = true;
			return this._object.splice(index, 1)[0];
		},

		/**
		 * @param {imageApp.model.Object} object
		 * @param {number} index
		 */
		insertObjectOnIndex: function (object, index) {
			index = (index == -1) ? this._object.length : index;
			this._object.splice(index, 0, object);
			this._isChange = true;
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
			for (var i = 0; i < this._object.length; ++i) {
				this._object[i].outLog(i);
			}
		},

		/**
		 * @private
		 */
		_outLog: function () {
			if (this._isChange)
			{
				console.log("The number of models: " + this._object.length);
				this._isChange = false;
			}
		}


	});
});