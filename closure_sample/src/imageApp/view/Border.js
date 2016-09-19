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
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._border);
		},


		/**
		 * @param {!goog.math.Rect} frame
		 * @param {!goog.math.Coordinate=} oldPos
		 * @return {!goog.math.Rect}
		 */
		getMinFrame: function(frame, oldPos) {
			/*frame.left = (frame.width < 100) ? oldPos.x : frame.left;
			frame.top = (frame.height < 100) ? oldPos.y : frame.top;
			frame.width = (frame.width < 100) ? 100 : frame.width;
			frame.height = (frame.height < 100) ? 100 : frame.height;*/
			return frame;
		},

		/**
		 * @returns {!goog.math.Rect}
		 */
		getFrame: function() {
			return this._frame;
		},

		/**
		 * @inheritDoc 
		 */
		getDOMElement: function () {
			return this._border;
		},

		activeBorder: function () {
			goog.style.setStyle(this._border, "opacity", "1");
			goog.style.setStyle(this._border, " pointer-events", "none");
			this._setVisibilityCorners("block");
		},

		deactiveBorder: function() {
			goog.style.setStyle(this._border, "opacity", "0");
			goog.style.setStyle(this._border, " pointer-events", "all");
			this._setVisibilityCorners("none");
		},

		/**
		 * @param {string} type
		 * @private
		 */
		_setVisibilityCorners: function(type) {
			var elems = this._border.childNodes;
			elems = Array.prototype.slice.call(elems); 

			elems.forEach(function(elem) {
				goog.style.setStyle(elem, "display", type);
			}, type);
		},

		/** 
		 * @private
		 */
		_init: function() {
			/** @private {!Element} */
			this._border = document.createElement(goog.dom.TagName.DIV);
			this._border.setAttribute("class", "border");
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._border);
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._border);
			/** @private {!Element} */
			this._top = this._createLine("top");
			/** @private {!Element} */
			this._bottom = this._createLine("bottom");
			/** @private {!Element} */
			this._left = this._createLine("left");
			/** @private {!Element} */
			this._right = this._createLine("right");
			/** @private {!Element} */
			this._NWCorner = this._createCorner("nw");
			/** @private {!Element} */
			this._NCorner = this._createCorner("n");
			/** @private {!Element} */
			this._NECorner = this._createCorner("ne");
			/** @private {!Element} */
			this._WCorner = this._createCorner("w");
			/** @private {!Element} */
			this._ECorner = this._createCorner("e");
			/** @private {!Element} */
			this._SWCorner = this._createCorner("sw");
			/** @private {!Element} */
			this._SCorner = this._createCorner("s");
			/** @private {!Element} */
			this._SECorner = this._createCorner("se");

			this.deactiveBorder();
		},

		/**
		 * @param {string} name
		 * @returns {!Element}
		 * @private
		 */
		_createLine: function (name) {
			var div =  document.createElement(goog.dom.TagName.DIV);
			div.setAttribute("class", name);
			goog.style.setStyle(div, " pointer-events", "all");
			this._border.appendChild(div);
			return div;
		},
		
		/**
		 * @param {string} name
		 * @return {!Element}
		 * @private
		 */
		_createCorner:function(name) {
			var div = document.createElement(goog.dom.TagName.DIV);
			div.setAttribute("class", name);
			div.classList.add("corner");
			goog.style.setStyle(div, " pointer-events", "all");
			this._border.appendChild(div);
			return div;
		},


		/**
		 * @return {!Element}
		 */
		getTopLine: function() {
			return this._top;
		},
		/**
		 * @return {!Element}
		 */
		getBottomLine: function() {
			return this._bottom;
		},
		/**
		 * @return {!Element}
		 */
		getLeftLine: function() {
			return this._left;
		},
		/**
		 * @return {!Element}
		 */
		getRightLine: function() {
			return this._right;
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