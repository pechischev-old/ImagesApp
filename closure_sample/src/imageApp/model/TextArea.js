goog.provide("imageApp.model.TextArea");

goog.require("imageApp.model.Object");

goog.scope(function(){

	/**
	 * @param {!goog.math.Rect} frame
	 * @param {string} text
	 * @extends {imageApp.model.Object}
	 * @constructor
	 */
	imageApp.model.TextArea = goog.defineClass(imageApp.model.Object, {
		/**
		 * @param {!goog.math.Rect} frame
		 * @param {string} text
		 */
		constructor: function(frame, text) {
			goog.base(this, frame);
			/** @private {string} */
			this._text = (text) ? text : "";
		},

		/**
		 * @param {string} text
		 */
		setText: function(text) {
			this._text = text;
			document.dispatchEvent(new CustomEvent("change text", {
				detail: {
					id: goog.getUid(this),
					text: this._text
				}
			}));
		},

		/**
		 * @return {string}
		 */
		getText: function() {
			return this._text;
		},

		/**
		 * @inheritDoc
		 */
		getType: function () {
			return "textarea";
		}
	});
});