goog.provide("AppView");


goog.require("goog.dom");

goog.scope(function() {
    /** @const {goog.math.Size} */
    const CANVAS_SIZE = new goog.math.Size(500, 400);
    /** @const {string} */
    const CANVAS_NAME = "testCanvas";

    /**
     * @constructor
     */
    AppView = goog.defineClass(null, {
        constructor: function() {
            var fragment = document.createDocumentFragment();
            fragment.appendChild(this._createButton());
            fragment.appendChild(this._createCanvas());
            document.body.appendChild(fragment);
        },

        /** @param {!goog.math.Rect} frame */
        createImage: function(frame) {

        },

        /** @private 
          * @return {!Element}*/
        _createButton: function() {
            // create class Button for simple Toolbar
            /**
             * @type {!Element}
             * @private
             */
            var btn = goog.dom.createElement(goog.dom.TagName.BUTTON);
            btn.id = "loading";
            btn.style.width = "70px";
            btn.style.height = "50px";
            btn.style.left = "20px";
            btn.style.top = "150px";
            btn.style.cssFloat = "right";
            return btn;
        },
        /** @private 
          * @return {!Element} */
        _createCanvas: function () {
            var canvas = goog.dom.createElement("canvas");
            canvas.id = CANVAS_NAME;
            canvas.width = CANVAS_SIZE.width;
            canvas.height = CANVAS_SIZE.height;
            canvas.style.cssFloat = "right";
            canvas.style.border = "4px double black";
            return canvas;
        }

    });
});