goog.provide("imageApp.view.Border");

goog.require("goog.dom");
goog.require("goog.math.Rect");
goog.require("imageApp.view.Node");

goog.scope(function() {
    

    /**
     * @param {goog.math.Rect} frame
     * @constructor 
     * @extends {imageApp.view.Node} 
     */
    imageApp.view.Border = goog.defineClass(imageApp.view.Node, {
        constructor: function(frame) {
            goog.base(this);
            /** @private {goog.math.Rect} */
            this._frame = frame;
            this._init();    
        },

        /**
         * @param {goog.math.Rect} frame
         */
        setFrame: function(frame) {
            this._frame = frame;
            this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._border);
        },

        /**
         * @inheritDoc 
         */
        getDOMElement: function () {
            return this._border;
        },

        activeBorder: function () {
            goog.style.setStyle(this._border, "display", "block");
        },

        deactiveBorder: function() {
            goog.style.setStyle(this._border, "display", "none");
        },

        /** 
         * @private
         */
        _init: function() {
            // TODO: создать отдельно 8 элементов и подписать обработчики (для ресайза)
            /** @private {!Element} */
            this._border = document.createElement(goog.dom.TagName.DIV);
            this._border.setAttribute("class", "border");
            this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._border);
            this.deactiveBorder();
        },
        
        /**
         * @param {string} name
         * @return {!Element}
         */
        createCorner:function(name) {
            var div = document.createElement(goog.dom.TagName.DIV);
            div.setAttribute("class", name);
            this._border.appendChild(div);
            return div;
        }
    });
});