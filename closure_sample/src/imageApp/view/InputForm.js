goog.provide("imageApp.view.InputForm");

goog.require("imageApp.view.Node");
goog.require("goog.dom");

goog.scope(function() {
	const PLACEHOLDER_TEXT = "Enter the Url or local address pictures";
	/** 
	 * @extends {imageApp.view.Node}
	 * @constructor
	 */
	imageApp.view.InputForm = goog.defineClass(imageApp.view.Node, {
		constructor: function() {
			goog.base(this);
			/** @private {!Element} */
			this._inputForm = document.createElement(goog.dom.TagName.INPUT);
			this._inputForm.id = "imageInput";
			this._inputForm.type = "text";
			this._inputForm.setAttribute("placeholder", PLACEHOLDER_TEXT);
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