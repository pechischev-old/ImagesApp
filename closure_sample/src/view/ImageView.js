goog.provide("view.ImageView");


goog.require("goog.dom");
goog.require("goog.style");
goog.require("view.IDOMElement");
goog.require("view.Border");
goog.require("goog.events");
goog.require("goog.events.EventType");
goog.scope(function() {

    /**
     * @param {!goog.math.Rect} frame
     * @param {string} path
     * @implements {view.IDOMElement}
     * @constructor */
    view.ImageView = goog.defineClass(null, {
        constructor: function(frame, path) {
            /** @private {string} */
            this._path = path;
            /** @private {!goog.math.Rect} */
            this._frame = frame;
            this._create();
            /** @private {view.Border} */
            this._border = new view.Border(frame);
            this._container.appendChild(this._border.getDOMElement());
        },

        /** @param {!goog.math.Rect} frame */
        setFrame: function(frame){
            this._frame = frame;
        },
        /** @return {!Element}
         * @override
         */
        getDOMElement: function(){
            return this._container;
        },
        /**
         * @private
         * @override
         */
        _create: function() {
           
            /** @private {!Element} */
            this._container = document.createElement(goog.dom.TagName.DIV);
            this._container.setAttribute("class", "capture");

            goog.style.setStyle(this._container, "top", this._frame.top + "px");
            goog.style.setStyle(this._container, "left", this._frame.left + "px");

            var image = document.createElement(goog.dom.TagName.IMG);
            image.setAttribute("src", this._path);
            image.setAttribute("alt", "текст");
            goog.style.setStyle(image, "width", this._frame.width + "px");
            goog.style.setStyle(image, "height", this._frame.height  + "px");
            this._container.appendChild(image);
        }
    });
});