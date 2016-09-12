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
			return this._container;
		},

		/**
		 * @inheritDoc
		 */
		getMinFrame: function(frame, oldPos) {
			frame.left = (frame.width < MIN_SIZE.width) ? oldPos.x : frame.left;
			frame.top = (frame.height < MIN_SIZE.height) ? oldPos.y : frame.top;
			frame.width = (frame.width < MIN_SIZE.width) ? MIN_SIZE.width : frame.width;
			frame.height = (frame.height < MIN_SIZE.height) ? MIN_SIZE.height : frame.height;
			return frame;
		},


		/** 
		 * @inheritDoc 
		 */
		_reloadStyleSize: function() {
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
			var image = this._container.getElementsByTagName(goog.dom.TagName.IMG)[0];
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
		},
		

		/**
		 * @inheritDoc
		 */
		_init: function() {

			/** @private {!Element} */
			this._container = document.createElement(goog.dom.TagName.DIV);
			this._container.setAttribute("class", "capture");

			var image = document.createElement(goog.dom.TagName.IMG);
			image.setAttribute("src", this._path);
			image.setAttribute("alt", "текст");
			this._container.appendChild(image);

			this._reloadStyleSize();
			this._container.appendChild(this._initBorder());
		}
	});
});