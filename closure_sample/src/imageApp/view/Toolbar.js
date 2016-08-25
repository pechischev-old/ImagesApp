goog.provide("imageApp.view.Toolbar");

goog.require("imageApp.view.Button");
goog.require("imageApp.view.Node");

goog.scope(function() {

	/** 
	 * @constructor
	 * @extends {imageApp.view.Node}
	 */
	imageApp.view.Toolbar = goog.defineClass(imageApp.view.Node, {
		constructor: function() {
			goog.base(this);
			/** @private {!Element} */
			this._toolbar = document.createElement(goog.dom.TagName.DIV);
			this._toolbar.setAttribute("id", "toolbar");
			/** @private {Array<imageApp.view.Button>} */
			this._buttons = [];
		},

		/** 
		 * @param {!number} index 
		 * @return {imageApp.view.Button} 
		 */
		getButtonOnIndex: function(index) {
			return this._buttons[index];
		},

		/** 
		 * @param {imageApp.view.Button} btn 
		 */
		appendButton: function(btn) {
			this._buttons.push(btn);
			this._toolbar.appendChild(btn.getDOMElement());
		},

		/**
		 * @return {!Element}
		 * @override 
		 */
		getDOMElement: function() {
			return this._toolbar;
		},

		/** 
		 * @return {number} 
		 */
		getButtonsCount: function () {
			return this._buttons.length;
		}
	});
});