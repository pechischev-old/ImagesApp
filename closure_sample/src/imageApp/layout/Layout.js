goog.provide("imageApp.layout.Layout");

goog.require("imageApp.layout.ILayout");
goog.require("imageApp.model.Object");
goog.require("imageApp.events.EventType");
goog.require("imageApp.events.ActionEvent");

goog.scope(function () {

	/**
	 * @param {imageApp.model.Object} object
	 * @implements {imageApp.layout.ILayout}
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
				this.dispatchEvent(new Event(imageApp.events.EventType.LAYOUT_CHANGED));
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
		 * @inheritDoc
		 */
		setFrame: function(frame) {
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