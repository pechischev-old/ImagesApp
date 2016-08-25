goog.provide("imageApp.view.IDOMElement");

/**
 * @interface
 */
imageApp.view.IDOMElement = function() {};
/** @return {!Element} */
imageApp.view.IDOMElement.prototype.getDOMElement = goog.abstractMethod;