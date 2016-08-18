goog.provide("view.ImageView");


goog.require("goog.dom");
goog.require("view.Border");
goog.require("observer.IObserver");
goog.require("view.Node");

goog.scope(function() {

    /**
     * @param {!goog.math.Rect} frame
     * @param {string} path
     * @implements {observer.IObserver}
     * @extends {view.Node}
     * @constructor */
    view.ImageView = goog.defineClass(view.Node, {
        constructor: function(frame, path) {
            /** @private {string} */
            this._path = path;
            /** @private {boolean} */
            this._isSelected = false;
            this.setFrame(frame);

            this._create();
            //goog.events.listen(this._container, goog.events.EventType.CLICK, goog.bind(this.isVisibleBorder, this, true));
            /** @private {view.Border} */
            this._border = new view.Border(this._frame);
            this._container.appendChild(this._border.getDOMElement());
        },

        /** @return {boolean} */
        isSelected: function () {
            return this._isSelected;
        },

        /** @param {!goog.math.Rect} frame */
        update: function(frame) {
            this.setFrame(frame);
            this._border.setFrame(frame);
            this._reloadStyleSize();
        },

        /** @param {boolean} isVisible
         * @param {!Event} event */

        isVisibleBorder: function(isVisible, event) {
            this._isSelected = isVisible;
            if (this.isSelected())
            {
                event.preventDefault();
                this._border.activeBorder();
            }
            else
            {
                this._border.deactiveBorder();
            }
        },

        /** @param {!goog.math.Rect} frame */
        setFrame: function(frame){
            /** @private {!goog.math.Rect} */
            this._frame = frame;
        },
        /** @return {!Element}
         * @override */
        getDOMElement: function(){
            return this._container;
        },
        /** @private */
        _reloadStyleSize: function() {
            this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);

            var image = this._container.getElementsByTagName(goog.dom.TagName.IMG)[0];
            this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
        },
        /**
         * @private
         * @override
         */
        _create: function() {
            /** @private {!Element} */
            this._container = document.createElement(goog.dom.TagName.DIV);
            this._container.setAttribute("class", "capture");

            this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);

            var image = document.createElement(goog.dom.TagName.IMG);
            image.setAttribute("src", this._path);
            image.setAttribute("alt", "текст");
            this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
            this._container.appendChild(image);
        }

    });
});