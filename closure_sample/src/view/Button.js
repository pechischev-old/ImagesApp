goog.provide("view.Button");

goog.require("goog.dom");
goog.require("view.Node");

goog.scope(function () {

    /**
     * @param {string} text
     * @implements {view.IDOMElement}
     * @extends {view.Node}
     * @constructor
     */
    view.Button = goog.defineClass(view.Node, {
        /**
         * @param {string} text
         */
        constructor: function(text) {
            goog.base(this);
            /** @private {!Element} */
            this._btn = document.createElement(goog.dom.TagName.BUTTON);
            this._btn.setAttribute("class", "button");
            this._btn.innerHTML = text;
        },
        
        /**
         * @param {Function} action
         */
        setAction: function(action) {
            this._btn.onclick = action;
        },

        /**
         * @return {!Element}
         * @inheritDoc
         */
        getDOMElement: function() {
            return this._btn;
        }
    });
});