goog.provide("imageApp.view.IObject");

/**
 * @interface
 */
imageApp.view.IObject =  function () {};

imageApp.view.IObject.prototype = {
	/**
	 * @param {!goog.math.Rect} frame
	 */
	setFrame: goog.abstractMethod,

	/**
	 * @return {!goog.math.Rect}
	 */
	getFrame: goog.abstractMethod,

	/**
	 * @return {boolean}
	 */
	isSelected: goog.abstractMethod
};