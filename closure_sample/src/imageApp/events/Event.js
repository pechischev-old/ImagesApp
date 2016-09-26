goog.provide("imageApp.events.Event");

goog.scope(function () {

	/**
	 * @param {!string} type
	 * @param {Object=} object
	 * @constructor
	 * @extends {goog.events.Event}
	 */
	imageApp.events.Event = goog.defineClass(null, {
	/**
	 * @param {!string} type
	 * @param {Object=} object
	 */
		constructor: function(type, object) {
			goog.events.Event.call(this, type);
			this.object = object;
		}
	});
});