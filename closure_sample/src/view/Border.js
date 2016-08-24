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

            this._SECorner = this._createCorner(CLASSES[0]);
            this._SCorner = this._createCorner(CLASSES[1]);
            this._SWCorner = this._createCorner(CLASSES[2]);
            this._ECorner = this._createCorner(CLASSES[3]);
            this._WCorner = this._createCorner(CLASSES[4]);
            this._NECorner = this._createCorner(CLASSES[5]);
            this._NCorner = this._createCorner(CLASSES[6]);
            this._NWCorner = this._createCorner(CLASSES[7]);
        },
		/**
         * @param {string} name
         * @private
         */
        _createCorner:function(name) {
            var div = document.createElement(goog.dom.TagName.DIV);
            div.setAttribute("class", name);
            this._border.appendChild(div);
            return div;
        },

		/**
         * @param {!Element} elem
         * @param {function} func
         * @private
         */
        subscriptionHandler: function (elem, func) {
            goog.events.listen(elem, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {

                if (event.defaultPrevented) 
                {
                    return;
                }
                else if (event.which > 1) 
                {
                    return;
                }
                
                func();

                event.preventDefault();
            }, this));
        }
    });
});