goog.provide("view.Toolbar");

goog.require("view.Button");
goog.require("goog.style");

goog.scope(function() {

    /** @constructor */
    view.Toolbar = goog.defineClass(null, {
        constructor: function() {
            this._createToolbar();
            /** @private {Array<view.Button>} */
            this._buttons = [];
        },
        
        /** @param {!number} index 
         * @return {view.Button} */
        getButtonOnIndex: function(index) {
            return this._buttons[index];
        },
        /** @param {view.Button} btn */
        appendButton: function(btn) {
            this._buttons.push(btn);
            this._toolbar.appendChild(btn.getDOMElement());
        },
        /** @return {!Element} */
        getDOMElement: function() {
            return this._toolbar;
        },
        
        /** @return {number} */
        getButtonsCount: function () {
            return this._buttons.length;
        },
        
        /** @private */
        _createToolbar: function() {
            /** @private {!Element} */
            this._toolbar = document.createElement(goog.dom.TagName.DIV);
            this._toolbar.setAttribute("id", "toolbar");
            
        }
    });
});