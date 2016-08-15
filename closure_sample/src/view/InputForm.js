goog.provide("view.InputForm");

goog.require("view.IDOMElement");
goog.require("goog.dom");

goog.scope(function() {

    /** @implements {view.IDOMElement}
     * @constructor
     */
    view.InputForm = goog.defineClass(null, {
        constructor: function() {
            this._create();
        },
        
        /** @return {string} */
        getValue: function() {
            return this._inputForm.value;
        },

        /** @return {!Element} */
        getDOMElement: function(){
            return this._inputForm;
        },

        /** @private */
        _create: function() {
            /** @private {!Element} */
            this._inputForm = document.createElement(goog.dom.TagName.INPUT);
            this._inputForm.id = "imageInput";
            this._inputForm.type = "text";
            this._inputForm.setAttribute("placeholder", "Введите Url или локальный адрес картинки");
            this._inputForm.onfocus = goog.bind(this.clearBox, this);
        },

        clearBox: function(){
            this._inputForm.value =  "";
        }
    });
});