goog.provide("view.Button");

goog.require("goog.dom");

goog.scope(function () {

    /**
     * @param {string} text
     * @constructor */
    view.Button = goog.defineClass(null, {
        constructor: function(text) {
            /** @private {string} */
            this._value = text;
            this._createDOMElement();
        },
        
        /** @param {Function} action */
        setAction: function(action) {
            this._btn.onclick = action;
        },

        /** @return {!Element} */
        getDOMElement: function() {
            return this._btn;
        },

        _createDOMElement: function() {
            /** @private {!Element} */
            this._btn = document.createElement(goog.dom.TagName.BUTTON);
            this._btn.setAttribute("class", "button");
            this._btn.innerHTML = this._value;
        }
    });
});