goog.provide("imageApp.view.Frame");


goog.require("goog.dom");
goog.require("goog.math.Rect");
goog.require("imageApp.view.Node");
goog.require("imageApp.view.IObject");
goog.require("imageApp.handlers.AddResizeListener");

goog.scope(function() {
	const MIN_SIZE_FRAME = new goog.math.Size(25, 18);

	/**
	 * @param {goog.math.Rect} frame
	 * @constructor
	 * @implements {imageApp.view.IObject}
	 * @extends {imageApp.view.Node}
	 */
	imageApp.view.Frame = goog.defineClass(imageApp.view.Node, {
		constructor: function (frame) {
			goog.base(this);
			/** @private {goog.math.Rect} */
			this._frame = frame;
			/** @private {boolean} */
			this._isSelected = false;
			this._init();
		},

		/**
		 * @param {function(!goog.math.Rect)} handler
		 * @param {imageApp.view.IObject=} object
		 */
		addListener: function (handler, object) {
			var pos = this.getFrame().getTopLeft();
			var movableObject = (object) ? object : this;
			imageApp.handlers.AddResizeListener(this._top, movableObject, function(frame, shift){
				return new goog.math.Rect(frame.left - shift.x, frame.top - shift.y, frame.width, frame.height);
			}, handler);

			imageApp.handlers.AddResizeListener(this._bottom, movableObject, function(frame, shift){
				return new goog.math.Rect(frame.left - shift.x, frame.top - shift.y, frame.width, frame.height);
			}, handler);

			imageApp.handlers.AddResizeListener(this._left, movableObject, function(frame, shift){
				return new goog.math.Rect(frame.left - shift.x, frame.top - shift.y, frame.width, frame.height);
			}, handler);

			imageApp.handlers.AddResizeListener(this._right, movableObject, function(frame, shift){
				return new goog.math.Rect(frame.left - shift.x, frame.top- shift.y, frame.width, frame.height );
			}, handler);

			imageApp.handlers.AddResizeListener(this._NWCorner, this, goog.bind(function(frame, shift){
				return this._getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top - shift.y, frame.width + shift.x, frame.height + shift.y), pos);
			}, this), handler);

			imageApp.handlers.AddResizeListener(this._NECorner, this, goog.bind(function(frame, shift){
				return this._getMinFrame(new goog.math.Rect(frame.left, frame.top - shift.y, frame.width - shift.x, frame.height + shift.y), pos);
			}, this), handler);

			imageApp.handlers.AddResizeListener(this._SWCorner, this, goog.bind(function(frame, shift){
				return this._getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top , frame.width + shift.x, frame.height - shift.y), pos);
			}, this), handler);

			imageApp.handlers.AddResizeListener(this._SECorner, this, goog.bind(function(frame, shift){
				return this._getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height - shift.y), pos);
			}, this), handler);

			imageApp.handlers.AddResizeListener(this._ECorner, this, goog.bind(function(frame, shift){
				return this._getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height), pos);
			}, this), handler);

			imageApp.handlers.AddResizeListener(this._WCorner, this, goog.bind(function(frame, shift){
				return this._getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top, frame.width + shift.x, frame.height), pos);
			}, this), handler);

			imageApp.handlers.AddResizeListener(this._NCorner, this, goog.bind(function(frame, shift){
				return this._getMinFrame(new goog.math.Rect(frame.left, frame.top - shift.y, frame.width , frame.height + shift.y), pos);
			}, this), handler);

			imageApp.handlers.AddResizeListener(this._SCorner, this, goog.bind(function(frame, shift){
				return this._getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width, frame.height - shift.y), pos);
			}, this), handler);
		},

		/**
		 * @inheriDoc
		 */
		getFrame: function() {
			return this._frame;
		},

		/**
		 * @param {!goog.math.Rect} frame
		 * @param {!goog.math.Coordinate} oldPos
		 * @return {!goog.math.Rect}
		 */
		_getMinFrame: function (frame, oldPos) {
			frame.left = (frame.width < MIN_SIZE_FRAME.width) ? this._frame.left : frame.left;
			frame.top = (frame.height < MIN_SIZE_FRAME.height) ? this._frame.top : frame.top;
			frame.width = (frame.width < MIN_SIZE_FRAME.width) ? MIN_SIZE_FRAME.width : frame.width;
			frame.height = (frame.height < MIN_SIZE_FRAME.height) ? MIN_SIZE_FRAME.height : frame.height;
			return frame;
		},

		/**
		 * @inheriDoc
		 */
		isSelected: function () {
			return this._isSelected;
		},

		/**
		 * @inheriDoc
		 */
		setFrame: function(frame) {
			this._frame = frame;
			this._updateFrame();
		},

		/**
		 * @inheritDoc
		 */
		getDOMElement: function () {
			return this._border;
		},

		/**
		 * @param {boolean} isVisible
		 */
		setVisibleBorder: function(isVisible) {
			this._isSelected = isVisible;
			var opacity = (isVisible ? "1" : "0");
			var typeDisplay = (isVisible ? "block" : "none");
			goog.style.setStyle(this._border, "opacity", opacity);
			this._setVisibilityCorners(typeDisplay);
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
		_updateFrame: function () {
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._border);
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._border);
		},


		/**
		 * @private
		 */
		_init: function() {
			/** @private {!Element} */
			this._border = document.createElement(goog.dom.TagName.DIV);
			this._border.setAttribute("class", "border");
			goog.style.setStyle(this._border, "pointer-events", "none");
			this._updateFrame();

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

			this.setVisibleBorder(false);
		},

		/**
		 * @param {string} name
		 * @returns {!Element}
		 * @private
		 */
		_createLine: function (name) {
			var div =  document.createElement(goog.dom.TagName.DIV);
			div.setAttribute("class", name);
			goog.style.setStyle(div, "pointer-events", "auto");
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
			goog.style.setStyle(div, "pointer-events", "auto");
			this._border.appendChild(div);
			return div;
		}
	});
	
});