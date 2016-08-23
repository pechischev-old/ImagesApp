goog.provide("view.InputForm");

goog.require("view.Node");
goog.require("goog.dom");

goog.scope(function() {

    /** 
     * @extends {view.Node}
     * @constructor
     */
    view.InputForm = goog.defineClass(view.Node, {
        constructor: function() {
            goog.base(this);
            /** @private {!Element} */
            this._inputForm = document.createElement(goog.dom.TagName.INPUT);
            this._inputForm.id = "imageInput";
            this._inputForm.type = "text";
            this._inputForm.setAttribute("placeholder", "Введите Url или локальный адрес картинки");
            this._inputForm.onfocus = goog.bind(this.clearBox, this);
        },
        
        /** 
         * @return {string} 
         */
        getValue: function() {
            return this._inputForm.value;
        },

        /** 
         * @return {!Element}
         * @override 
         */
        getDOMElement: function(){
            return this._inputForm;
        },
        
        clearBox: function(){
            this._inputForm.value =  "";
        }
    });
});