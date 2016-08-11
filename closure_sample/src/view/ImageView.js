goog.provide("view.ImageView");


goog.require("goog.dom");
goog.require("goog.style");

goog.scope(function() {

    /**
     * @param {!goog.math.Rect} frame
     * @param {string} path
     * @constructor */
    view.ImageView = goog.defineClass(null, {
        constructor: function(frame, path) {
            /** @private {string} */
            this._path = path;
            /** @private {!goog.math.Rect} */
            this._frame = frame;
        },

        /** @param {!goog.math.Rect} frame */
        setFrame: function(frame){
            this._frame = frame;
        },

        /**
         * @returns {!Element}
         */
        createStructDOM: function() {
            //var fragment = document.createDocumentFragment();
            var container = document.createElement(goog.dom.TagName.DIV);
            container.setAttribute("class", "capture");


            goog.style.setStyle(container, "top", this._frame.top + "px");
            goog.style.setStyle(container, "left", this._frame.left + "px");

            var image = document.createElement(goog.dom.TagName.IMG);
            image.setAttribute("src", this._path);
            image.setAttribute("alt", "текст");
            goog.style.setStyle(image, "width", this._frame.width + "px");
            goog.style.setStyle(image, "height", this._frame.height  + "px");
            container.appendChild(image);
            return container;
        }
    });
});