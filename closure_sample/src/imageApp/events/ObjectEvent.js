goog.provide("imageApp.events.ObjectEvent");

goog.require("goog.events.Event");

goog.scope(function () {
	
	/**
	 * @param {!string} type
	 * @param {imageApp.view.IObject|imageApp.model.Object} object
	 * @param {?goog.math.Coordinate|goog.math.Rect|string=} param
	 * @constructor
	 * @extends {goog.events.Event}
	 */
	imageApp.events.ObjectEvent = goog.defineClass(goog.events.Event, {
		/**
		 * @param {!string} type
		 * @param {imageApp.view.IObject|imageApp.model.Object} object
		 * @param {?goog.math.Coordinate|goog.math.Rect|string=}  param
		 */
		constructor: function(type, object, param) {
			goog.base(this, type);
			this.param = param;
			this.object = object;
		}
	});
});
