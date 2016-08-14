goog.provide("view.Border");

goog.require("goog.dom");
goog.require("goog.math.Rect");
goog.require("view.IDOMElement");
goog.require("goog.style");

goog.scope(function() {
    /** @const {Array<string>} */
    const CLASSES = ['se', 's', 'sw', 'e', 'w', 'ne', 'n', 'nw'];
    const SIDE = 10;

    /** @param {goog.math.Rect} frame
     * @constructor 
     * @implements {view.IDOMElement}*/    
    view.Border = goog.defineClass(null, {
        constructor: function(frame) {
            /** @private {goog.math.Rect} */
            this._frame = frame;
            this._create();    
        },
        /** @param {goog.math.Rect} frame */
        setFrame: function(frame) {
            this._frame = frame;
            this._reloadStyleSize();
        },
        
        /** @return {!Element} 
         * @override */
        getDOMElement: function () {
            return this._border;
        },

        activeBorder: function () {
            goog.style.setStyle(this._border, "display", "block");
        },

        deactiveBorder: function() {
            goog.style.setStyle(this._border, "display", "none");
        },

        /** @private */
        _reloadStyleSize: function() { // TODO: get rid of the duplication of code
            this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._border);
            var divs = this._border.getElementsByTagName(goog.dom.TagName.DIV);
            var i = 0;
            for (var h = 0; h <= 2; ++h )
            {
                for (var w = 0; w <= 2; ++w)
                {
                    if (!(h == 1 && w == 1))
                    {
                        var l = w * 0.5 * this._frame.width;
                        var t = h * 0.5 * this._frame.height;
                        var div = divs[i];
                        this._setStyleElementPosition(new goog.math.Coordinate((l - SIDE / 2), (t - SIDE / 2)), div);
                        ++i;
                    }
                }
            }
        },
        
        /** @private 
         * @override */
        _create: function() {
            /** @private {!Element} */
            this._border = document.createElement(goog.dom.TagName.DIV);
            this._border.setAttribute("class", "border");
            this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._border);
            this.deactiveBorder();
            var i = 0;
            for (var h = 0; h <= 2; ++h )
            {
                for (var w = 0; w <= 2; ++w )
                {
                    if (!(h == 1 && w == 1))
                    {
                        var l = w * 0.5 * this._frame.width;
                        var t = h * 0.5 * this._frame.height;
                        var div = document.createElement(goog.dom.TagName.DIV);
                        div.setAttribute("class", CLASSES[i]);
                        this._setStyleElementPosition(new goog.math.Coordinate((l - SIDE / 2), (t - SIDE / 2)), div);
                        this._setStyleElementSize(new goog.math.Size(SIDE, SIDE), div);
                        this._border.appendChild(div);
                        ++i;
                    }
                }
            }
        },

        /** @param {!goog.math.Coordinate} pos
         * @param {!Element} elem
         * @private */
        _setStyleElementPosition: function(pos, elem) {
            goog.style.setStyle(elem, "top", pos.y + "px");
            goog.style.setStyle(elem, "left", pos.x + "px");
        },
        /** @param {!goog.math.Size} size
         * @param {!Element} elem
         * @private */
        _setStyleElementSize: function(size, elem) {
            goog.style.setStyle(elem, "width", size.width + "px");
            goog.style.setStyle(elem, "height", size.height  + "px");
        }
    });
});