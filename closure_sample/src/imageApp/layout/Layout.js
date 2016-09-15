goog.provide("imageApp.layout.Layout");

goog.require("imageApp.layout.ILayout");
goog.require("imageApp.model.Object");
goog.require("imageApp.events.EventType");

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
			document.addEventListener(imageApp.events.EventType.OBJECT_CHANGED, goog.bind(function(event) {
				var object = event.detail;
				if (object == this._object)
				{
					document.dispatchEvent(new Event(imageApp.events.EventType.LAYOUT_CHANGED));
				}
			}, this));
		},

		/**
		 * @returns {imageApp.model.Object}
		 */
		getObject: function () {
			return this._object;
		},

		/**
		 * @inheritDoc
		 */
		setFrame: function(frame) {
			/*document.dispatchEvent(new CustomEvent("resize", {
				detail: {
					model: this._object,
					frame: frame
				}
			}));*/
			this._object.setFrame(frame);
		},

		/**
		 * @inheritDoc
		 */
		getFrame: function () {
			return this._object.getFrame();
		}
	});
});