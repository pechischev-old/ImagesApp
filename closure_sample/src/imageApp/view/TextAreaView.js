goog.provide("imageApp.view.TextAreaView");

goog.require("goog.dom");
goog.require("imageApp.view.ObjectView");

goog.scope(function() {

	/**
	 * @param {!goog.math.Rect} frame
	 * @extends {imageApp.view.ObjectView}
	 * @constructor
	 */
	imageApp.view.TextAreaView = goog.defineClass(imageApp.view.ObjectView, {
		/**
		 * @param {!goog.math.Rect} frame
		 */
		constructor: function(frame) {
			goog.base(this, frame);
			
			this._init();
		},


		/**
		 * @inheritDoc
		 */
		getDOMElement: function(){
			return this._container;
		},

		/**
		 * @inheritDoc
		 */
		_reloadStyleSize: function() {
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
			var image = this._container.getElementsByTagName(goog.dom.TagName.TEXTAREA)[0];
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
		},


		/**
		 * @inheritDoc
		 */
		_init: function() {

			/** @private {!Element} */
			this._container = document.createElement(goog.dom.TagName.DIV);
			this._container.setAttribute("class", "textarea");

			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);

			var image = document.createElement(goog.dom.TagName.TEXTAREA);
			image.setAttribute("name", "comment");
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
			this._container.appendChild(image);

			this._container.appendChild(this._initBorder());
		}
	});
});