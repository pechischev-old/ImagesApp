goog.provide("imageApp.model.TextArea");

goog.require("imageApp.model.Object");

goog.scope(function(){

	/**
	 * @param {!goog.math.Rect} frame
	 * @extends {imageApp.model.Object}
	 * @constructor
	 */
	imageApp.model.TextArea = goog.defineClass(imageApp.model.Object, {
		/**
		 * @param {!goog.math.Rect} frame
		 */
		constructor: function(frame) {
			goog.base(this, frame);
		},

		/**
		 * @inheritDoc
		 */
		getType: function () {
			return "textarea";
		}
	});
});