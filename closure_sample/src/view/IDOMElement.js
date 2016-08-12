goog.provide("view.IDOMElement");

/**
 * @interface
 */
view.IDOMElement = function() {};
view.IDOMElement.prototype = {
    /** @return {!Element} */
    getDOMElement: goog.abstractMethod,
    
    _create: goog.abstractMethod
};