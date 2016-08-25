goog.provide("imageApp.view.Button");

goog.require("goog.dom");
goog.require("imageApp.view.Node");

goog.scope(function () {

    /**
     * @param {string} text
     * @implements {imageApp.view.IDOMElement}
     * @extends {imageApp.view.Node}
     * @constructor
     */
    imageApp.view.Button = goog.defineClass(imageApp.view.Node, {
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