goog.provide("imageApp.view.Node");

goog.require("imageApp.view.IDOMElement");
goog.require("goog.style");

goog.scope(function() {

    /**
     * @implements {imageApp.view.IDOMElement}
     * @constructor
     */
    imageApp.view.Node = goog.defineClass(null, {
        constructor: function () {
        },

        /**
         * @return {!Element}
         */
        getDOMElement: function () {
        },

        /**
         * @param {!goog.math.Coordinate} pos
         * @param {!Element} elem
         */
        _setStyleElementPosition: function (pos, elem) {
            goog.style.setStyle(elem, "top", pos.y + "px");
            goog.style.setStyle(elem, "left", pos.x + "px");
        },

        /**
         * @param {!goog.math.Size} size
         * @param {!Element} elem
         */
        _setStyleElementSize: function (size, elem) {
            goog.style.setStyle(elem, "width", size.width + "px");
            goog.style.setStyle(elem, "height", size.height + "px");
        }
    });

});