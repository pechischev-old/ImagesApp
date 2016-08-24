goog.provide("AppModel");

goog.require("model.ImagesModel");

goog.scope(function () {

	/**
	 * @constructor
	 */
	AppModel = goog.defineClass(null, {
		constructor: function () {
			/**
			 * @private {model.ImagesModel}
			 */
			this._imagesModel = new model.ImagesModel();
		},

		/**
		 * @returns {model.ImagesModel}
		 */
		getImagesModel: function () {
			return this._imagesModel;
		},

		outputLog: function () {
			this._imagesModel.outputLog();
		}

	});
});