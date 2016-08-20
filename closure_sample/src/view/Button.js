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
            /** @private {string} */
            this._value = text;
            this._create();
        },
        
        /**
         * @param {Function} action
         */
        setAction: function(action) {
            this._btn.onclick = action;
        },

        /**
         * @return {!Element}
         * @override
         */
        getDOMElement: function() {
            return this._btn;
        },

        /**
         * @private
         * @override
         */
        _create: function() {
            /** @private {!Element} */
            this._btn = document.createElement(goog.dom.TagName.BUTTON);
            this._btn.setAttribute("class", "button");
            this._btn.innerHTML = this._value;
        }
    });
});