goog.provide("imageApp.view.ComboBox");

goog.require("goog.dom");
goog.require("imageApp.view.Node");
goog.require("imageApp.view.Button");

goog.scope(function () {

	/**
	 * @extends {imageApp.view.Node}
	 * @constructor
	 */
	imageApp.view.ComboBox = goog.defineClass(imageApp.view.Node, {

		constructor: function() {
			goog.base(this);
			/** @private {!Element} */
			this._combobox = document.createElement(goog.dom.TagName.DIV);
			this._combobox.setAttribute("class", "droplink");

			var button = new imageApp.view.Button("Layout");

			var ul = document.createElement(goog.dom.TagName.UL);
			this._setVisibilityBox(ul, "none");
			button.setAction(goog.bind(this._setVisibilityBox, this, ul, "block"));
			this._combobox.appendChild(button.getDOMElement());
			this._combobox.appendChild(ul);

			goog.events.listen(document.body, goog.events.EventType.MOUSEUP, goog.bind(this._setVisibilityBox, this, ul, "none"));
		},

		/**
		 * @param {string} style
		 * @param {!Element} elem
		 * @private
		 */
		_setVisibilityBox: function (elem, style) {
			goog.style.setStyle(elem, "display", style);
		},

		/**
		 * @param {imageApp.view.Button} btn
		 */
		appendElement: function(btn) {
			var ul = this._combobox.getElementsByTagName(goog.dom.TagName.UL)[0];
			var li = document.createElement(goog.dom.TagName.LI);
			li.appendChild(btn.getDOMElement());
			ul.appendChild(li);
			this._combobox.appendChild(ul);
		},

		/**
		 * @return {!Element}
		 * @inheritDoc
		 */
		getDOMElement: function() {
			return this._combobox;
		}
	});
});