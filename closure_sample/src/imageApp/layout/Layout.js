goog.provide("imageApp.layout.Layout");

goog.require("imageApp.layout.ILayout");
goog.require("imageApp.model.Object");

goog.scope(function () {

	/**
	 * @param {imageApp.model.Object} object
	 * @implements {imageApp.layout.ILayout}
	 * @constructor
	 */
	imageApp.layout.Layout = goog.defineClass(null, {
		/**
		 * @param {imageApp.model.Object}  object
		 */
		constructor: function(object) {
			/** @private {imageApp.model.Object} */
			this._object = object;
			this._object.canRemove(false);
		},

		/**
		 * @inheritDoc
		 */
		setFrame: function(frame) {
			document.dispatchEvent(new CustomEvent("resize", {
				detail: {
					model: this._object,
					frame: frame
				}
			}));
		},

		/**
		 * @inheritDoc
		 */
		getFrame: function () {
			return this._object.getFrame();
		}
	});
});