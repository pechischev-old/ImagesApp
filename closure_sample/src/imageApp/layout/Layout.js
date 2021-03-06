goog.provide("imageApp.layout.Layout");

goog.require("imageApp.model.Object");
goog.require("imageApp.events.EventType");
goog.require("imageApp.events.ActionEvent");

goog.scope(function () {

	/**
	 * @param {imageApp.model.Object} object
	 * @extends {goog.events.EventTarget}
	 * @constructor
	 */
	imageApp.layout.Layout = goog.defineClass(goog.events.EventTarget, {
		/**
		 * @param {imageApp.model.Object}  object
		 */
		constructor: function(object) {
			goog.base(this);
			/** @protected {imageApp.model.Object} */
			this._object = object;
			this._object.canRemove(false);
			goog.events.listen(this._object, imageApp.events.EventType.OBJECT_CHANGED, goog.bind(function(event) {
				this.dispatchEvent(new imageApp.events.ActionEvent(imageApp.events.EventType.LAYOUT_CHANGED, event.action));
			}, this));
			goog.events.listen(this._object, imageApp.events.EventType.WAS_RESIZE, goog.bind(function(event) {
				this.dispatchEvent(new imageApp.events.ActionEvent(imageApp.events.EventType.OFF_AUTOALIGN, event.action));
			}, this));
		},

		/**
		 * @returns {imageApp.model.Object}
		 */
		getObject: function () {
			return this._object;
		},

		/**
		 * @return {!goog.math.Rect}
		 */
		getFrame: function () {
			return this._object.getFrame();
		}
	});
});