goog.provide("model.IImage");


goog.require("goog.math.Rect");

/**
 * @interface
 */
model.IImage = function() {};
model.IImage.prototype = {
    
    resize: goog.abstractMethod,

    move: goog.abstractMethod    
};