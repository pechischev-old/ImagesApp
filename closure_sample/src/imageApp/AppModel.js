goog.provide("imageApp.AppModel");

goog.require("imageApp.model.ObjectsModel");

goog.scope(function () {

	/**
	 * @constructor
	 */
	imageApp.AppModel = goog.defineClass(null, {
		constructor: function () {
			/**
			 * @private {imageApp.model.ObjectsModel}
			 */
			this._object = new imageApp.model.ObjectsModel();
		},

		/**
		 * @returns {imageApp.model.ObjectsModel}
		 */
		getImagesModel: function () {
			return this._object;
		},

		outputLog: function () {
			this._object.outputLog();
		}

	});
});