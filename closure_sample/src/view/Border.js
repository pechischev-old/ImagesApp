goog.provide("view.Border");

goog.require("goog.dom");
goog.require("goog.math.Rect");
goog.require("view.Node");

goog.scope(function() {
    /** @const {Array<string>} */
    const CLASSES = ['se', 's', 'sw', 'e', 'w', 'ne', 'n', 'nw'];

    /**
     * @param {goog.math.Rect} frame
     * @constructor 
     * @extends {view.Node} 
     */
    view.Border = goog.defineClass(view.Node, {
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
            for (var i = 0; i < CLASSES.length; ++i)
            {
                var div = document.createElement(goog.dom.TagName.DIV);
                div.setAttribute("class", CLASSES[i]);
                this._border.appendChild(div);
            }
        }
    });
});