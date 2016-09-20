goog.provide("imageApp.view.ImageView");


goog.require("imageApp.view.ObjectView");

goog.scope(function() {
	/** @const {!goog.math.Size} */
	const MIN_SIZE = new goog.math.Size(100, 100);
	
	/**
	 * @param {!goog.math.Rect} frame
	 * @param {string} path
	 * @extends {imageApp.view.ObjectView}
	 * @constructor
	 */
	imageApp.view.ImageView = goog.defineClass(imageApp.view.ObjectView, {
		/**
		 * @param {!goog.math.Rect} frame
		 * @param {string} path
		 */
		constructor: function(frame, path) {
			goog.base(this, frame);
			/** @private {string} */
			this._path = path;
			this._init();
		},
		

		/**
		 * @inheritDoc 
		 */
		getDOMElement: function(){
			return this._object;
		},

		/** 
		 * @inheritDoc 
		 */
		_reloadStyleSize: function() {
			var image = this._container.getElementsByTagName(goog.dom.TagName.IMG)[0];
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
		},
		

		/**
		 * @inheritDoc
		 */
		_init: function() {
			/** @private {!Element} */
			this._object = document.createElement(goog.dom.TagName.DIV);
			this._object.setAttribute("class", "container");
			/** @private {!Element} */
			this._container = document.createElement(goog.dom.TagName.DIV);
			this._container.setAttribute("class", "capture");
			var image = document.createElement(goog.dom.TagName.IMG);
			image.setAttribute("src", this._path);
			image.setAttribute("alt", "текст");
			this._container.appendChild(image);
			this._object.appendChild(this._container);
			this._reloadStyleSize();
			this._object.appendChild(this._initBorder());
		}
	});
});