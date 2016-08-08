goog.provide("model.IImage");


goog.require("goog.math.Rect");

/**
 * @interface
 * @param {!goog.math.Rect} frame
 */
model.IImage = function(frame) {};
model.IImage.prototype = {
    
    resize: goog.abstractMethod,

    move: goog.abstractMethod    
};