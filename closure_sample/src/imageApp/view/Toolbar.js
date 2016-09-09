goog.provide("imageApp.view.Toolbar");

goog.require("imageApp.view.Button");
goog.require("imageApp.view.ComboBox");
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
			/** @private {Array<imageApp.view.Node>} */
			this._buttons = [];
		},

		/** 
		 * @param {imageApp.view.Node} elem
		 */
		appendElement: function(elem) {
			this._buttons.push(elem);
			this._toolbar.appendChild(elem.getDOMElement());
		},

		/**
		 * @return {!Element}
		 * @override 
		 */
		getDOMElement: function() {
			return this._toolbar;
		}
	});
});