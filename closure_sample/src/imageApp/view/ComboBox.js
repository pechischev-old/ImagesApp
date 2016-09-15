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
			button.setAction(goog.bind(this._down, this));
			var ul = document.createElement(goog.dom.TagName.UL);
			this._setVisibilityBox(ul, "none");

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
		 * @private
		 */
		_down: function () { // TODO: rename function
			var ul = this._combobox.getElementsByTagName(goog.dom.TagName.UL)[0];
			if (ul.style.display == "none")
			{
				this._setVisibilityBox(ul, "block");
			}
			else
			{
				this._setVisibilityBox(ul, "none");
			}
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