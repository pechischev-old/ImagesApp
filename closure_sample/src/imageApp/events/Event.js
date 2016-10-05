goog.provide("imageApp.events.Event");

goog.require("goog.events.Event");

goog.scope(function () {

	/**
	 * @param {!string} type
	 * @param {goog.math.Rect|string|number=} param
	 * @constructor
	 * @extends {goog.events.Event}
	 */
	imageApp.events.Event = goog.defineClass(goog.events.Event, {
	/**
	 * @param {!string} type
	 * @param {goog.math.Rect|string|number=} param
	 */
		constructor: function(type, param) {
			goog.base(this, type);
			this.param = param;
		}
	});
});