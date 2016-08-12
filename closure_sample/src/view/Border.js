goog.provide("view.Border");

goog.require("goog.dom");
goog.require("goog.math.Rect");
goog.require("view.IDOMElement");
goog.require("goog.style");

goog.scope(function() {
    /** @const {Array<string>} */
    const CLASSES = ['se', 's', 'sw', 'e', 'w', 'ne', 'n', 'nw'];
    const a = 10;

    /** @param {goog.math.Rect} frame
     * @constructor 
     * @implements {view.IDOMElement}*/    
    view.Border = goog.defineClass(null, {
        constructor: function(frame) {
            this.setFrame(frame);
            this._create();    
        },
        /** @param {goog.math.Rect} frame */
        setFrame: function(frame) {
            /** @private {goog.math.Rect} */
            this._frame = frame;
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
        
        /** @private 
         * @override */
        _create: function() {
            /** @private {!Element} */
            this._border = document.createElement(goog.dom.TagName.DIV);
            this._border.setAttribute("class", "border");
            goog.style.setStyle(this._border, "width", this._frame.width + "px");
            goog.style.setStyle(this._border, "height", this._frame.height + "px");
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
                        goog.style.setStyle(div, "left", (l - a / 2) + "px");
                        goog.style.setStyle(div, "top", (t - a / 2) + "px");
                        goog.style.setStyle(div, "width", a + "px");
                        goog.style.setStyle(div, "height", a + "px");
                        this._border.appendChild(div);
                        ++i;
                    }
                }
            }

        }
    });
});