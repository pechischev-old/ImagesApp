goog.provide("view.Toolbar");

goog.require("view.Button");
goog.require("view.Node");

goog.scope(function() {

    /** @constructor
     * @extends {view.Node}*/
    view.Toolbar = goog.defineClass(view.Node, {
        constructor: function() {
            this._create();
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
        /** @return {!Element}
         * @override */
        getDOMElement: function() {
            return this._toolbar;
        },
        
        /** @return {number} */
        getButtonsCount: function () {
            return this._buttons.length;
        },
        
        /** @private
         * @override */
        _create: function() {
            /** @private {!Element} */
            this._toolbar = document.createElement(goog.dom.TagName.DIV);
            this._toolbar.setAttribute("id", "toolbar");
        }
    });
});