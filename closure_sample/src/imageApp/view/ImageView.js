goog.provide("imageApp.view.ImageView");


goog.require("goog.dom");
goog.require("imageApp.view.Border");
goog.require("imageApp.observer.IObserver");
goog.require("imageApp.view.Node");

goog.scope(function() {

	/** @const {!goog.math.Size} */
	const MIN_SIZE = new goog.math.Size(200, 200);

	/**
	 * @param {!goog.math.Rect} frame
	 * @param {string} path
	 * @implements {imageApp.observer.IObserver}
	 * @extends {imageApp.view.Node}
	 * @constructor
	 */
	imageApp.view.ImageView = goog.defineClass(imageApp.view.Node, {
		constructor: function(frame, path) {
			goog.base(this);
			/** @private {string} */
			this._path = path;
			/** @private {boolean} */
			this._isSelected = false;
			/** @private {!goog.math.Rect} */
			this._frame = frame;

			this._init();
		},

		/** 
		 * @return {boolean} 
		 */
		isSelected: function () {
			return this._isSelected;
		},

		/** 
		 * @param {!goog.math.Rect} frame 
		 */
		update: function(frame) {
			this.setFrame(frame);
			this._border.setFrame(frame);
		},

		/** 
		 * @param {boolean} isVisible
		 */
		setVisibleBorder: function(isVisible) {
			this._isSelected = isVisible;
			if (this.isSelected())
			{
				this._border.activeBorder();
			}
			else
			{
					this._border.deactiveBorder();
			}
		},

		/** 
		 * @param {!goog.math.Rect} frame 
		 */
		setFrame: function(frame){
			var minFrame = this._getMinFrame(frame.clone());
			this._frame = ((!goog.math.Rect.equals(minFrame, frame)) ? minFrame : frame);
			this._reloadStyleSize();
			this._border.setFrame(this._frame);
		},
		
		 /**
		 * @returns {!goog.math.Rect}
		 */
		getFrame: function() {
			return this._frame;
		},

		/**
		 * @return {!goog.math.Coordinate}
		 */
		getPos: function() {
			return this._frame.getTopLeft();
		},

		/**
		 * @return {!Element}
		 * @override 
		 */
		getDOMElement: function(){
			return this._container;
		},

		/**
		 * @param {!goog.math.Rect} frame
		 * @returns {!goog.math.Rect}
		 * @private
		 */
		_getMinFrame: function (frame) {
			frame.left = (frame.width < MIN_SIZE.width) ? this._frame.left : frame.left;
			frame.top = (frame.height < MIN_SIZE.height) ? this._frame.top : frame.top;
			frame.width = (frame.width < MIN_SIZE.width) ? MIN_SIZE.width : frame.width;
			frame.height = (frame.height < MIN_SIZE.height) ? MIN_SIZE.height : frame.height;
			return frame;
		},

		/** 
		 * @private 
		 */
		_reloadStyleSize: function() {
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
			var image = this._container.getElementsByTagName(goog.dom.TagName.IMG)[0];
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
		},

		/**
		 * @private
		 */
		_init: function() {
			/** @private {!Element} */
			this._container = document.createElement(goog.dom.TagName.DIV);
			this._container.setAttribute("class", "capture");

			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);

			var image = document.createElement(goog.dom.TagName.IMG);
			image.setAttribute("src", this._path);
			image.setAttribute("alt", "текст");
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
			this._container.appendChild(image);

			/** @private {imageApp.view.Border} */
			this._border = new imageApp.view.Border(this._frame);
			this._container.appendChild(this._border.getDOMElement());
			
			this._initCorners();
		},


		/**
		 * @private
		 */
		_initCorners: function () {
			/** @private {!Element} */
			this._NWCorner = this._border.createCorner("nw");
			/** @private {!Element} */
			this._NCorner = this._border.createCorner("n");
			/** @private {!Element} */
			this._NECorner = this._border.createCorner("ne");
			/** @private {!Element} */
			this._WCorner = this._border.createCorner("w");
			/** @private {!Element} */
			this._ECorner = this._border.createCorner("e");
			/** @private {!Element} */
			this._SWCorner = this._border.createCorner("sw");
			/** @private {!Element} */
			this._SCorner = this._border.createCorner("s");
			/** @private {!Element} */
			this._SECorner = this._border.createCorner("se");
		},

		/** 
		 * @return {!Element} 
		 */
		getSECorner: function() {
			return this._SECorner;
		},

		/** 
		 * @return {!Element} 
		 */
		getSWCorner: function() {
			return this._SWCorner;
		},

		/** 
		 * @return {!Element} 
		 */
		getNWCorner: function() {
			return this._NWCorner;
		},

		/**
		 * @return {!Element} 
		 */
		getNECorner: function() {
			return this._NECorner;
		},
		
		/**
		 * @return {!Element} 
		 */
		getSCorner: function() {
			return this._SCorner;
		},

		/** 
		 * @return {!Element} 
		 */
		getWCorner: function() {
			return this._WCorner;
		},

		/** 
		 * @return {!Element} 
		 */
		getNCorner: function() {
			return this._NCorner;
		},

		/** 
		 * @return {!Element} 
		 */
		getECorner: function() {
			return this._ECorner;
		}
	});
});