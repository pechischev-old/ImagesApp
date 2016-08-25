goog.provide("imageApp.AppModel");

goog.require("imageApp.model.ImagesModel");

goog.scope(function () {

	/**
	 * @constructor
	 */
	imageApp.AppModel = goog.defineClass(null, {
		constructor: function () {
			/**
			 * @private {imageApp.model.ImagesModel}
			 */
			this._imagesModel = new imageApp.model.ImagesModel();
		},

		/**
		 * @returns {imageApp.model.ImagesModel}
		 */
		getImagesModel: function () {
			return this._imagesModel;
		},

		outputLog: function () {
			this._imagesModel.outputLog();
		}

	});
});