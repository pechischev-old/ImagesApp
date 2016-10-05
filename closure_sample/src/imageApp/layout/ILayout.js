goog.provide("imageApp.layout.ILayout");

/** @interface */
imageApp.layout.ILayout = function () {};

imageApp.layout.ILayout.prototype = {
	/**
	 * @param {!goog.math.Rect} frame
	 */
	setFrame: goog.abstractMethod,

	/**
	 * @return {!goog.math.Rect}
	 */
	getFrame: goog.abstractMethod
};