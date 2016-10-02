goog.provide("imageApp.events.Event");

goog.scope(function () {

	/**
	 * @param {!string} type
	 * @param {Object=} object
	 * @constructor
	 * @extends {goog.events.Event}
	 */
	imageApp.events.Event = goog.defineClass(goog.events.Event, {
	/**
	 * @param {!string} type
	 * @param {Object=} object
	 */
		constructor: function(type, object) {
			goog.base(this, type, object);
			this.object = object;
		}
	});
});