goog.provide("imageApp.view.Border");

goog.require("goog.dom");
goog.require("goog.math.Rect");
goog.require("imageApp.view.Node");

goog.scope(function() {

	/**
	 * @param {goog.math.Rect} frame
	 * @constructor 
	 * @extends {imageApp.view.Node} 
	 */
	imageApp.view.Border = goog.defineClass(imageApp.view.Node, {
		constructor: function(frame) {
			goog.base(this);
			/** @private {goog.math.Rect} */
			this._frame = frame;
			this._init();    
		},

		/**
		 * @param {goog.math.Rect} frame
		 */
		setFrame: function(frame) {
			this._frame = frame;
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._border);
		},

		/**
		 * @inheritDoc 
		 */
		getDOMElement: function () {
			return this._border;
		},

		activeBorder: function () {
			goog.style.setStyle(this._border, "opacity", "1");
			document.dispatchEvent(new Event("activeCorner"));
		},

		deactiveBorder: function() {
			goog.style.setStyle(this._border, "opacity", "0");
			document.dispatchEvent(new Event("deactiveCorner"));
		},

		/** 
		 * @private
		 */
		_init: function() {
			/** @private {!Element} */
			this._border = document.createElement(goog.dom.TagName.DIV);
			this._border.setAttribute("class", "border");
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._border);
			this.deactiveBorder();
		},
		
		/**
		 * @param {string} name
		 * @return {!Element}
		 */
		createCorner:function(name) {
			var div = document.createElement(goog.dom.TagName.DIV);
			div.setAttribute("class", name);
			goog.style.setStyle(div, "display", "none");
			this._border.appendChild(div);

			document.addEventListener("deactiveCorner", goog.bind(function(event) {
				goog.style.setStyle(div, "display", "none");
			}, this), false);

			document.addEventListener("activeCorner", goog.bind(function(event) {
				goog.style.setStyle(div, "display", "block");
			}, this), false);
			return div;
		}
	});
});