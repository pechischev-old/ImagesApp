goog.provide("imageApp.view.ObjectView");

goog.require("imageApp.view.Border");
goog.require("imageApp.observer.IObserver");
goog.require("imageApp.view.Node");

goog.scope(function () {

	/**
	 * @param {!goog.math.Rect} frame
	 * @implements {imageApp.observer.IObserver}
	 * @extends {imageApp.view.Node}
	 * @constructor
	 */
	imageApp.view.ObjectView = goog.defineClass(imageApp.view.Node, {
		/**
		 * @param {!goog.math.Rect} frame
		 */
		constructor: function(frame) {
			goog.base(this);
			/** @private {boolean} */
			this._isSelected = false;
			/** @protected {!goog.math.Rect} */
			this._frame = frame;

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
			this._frame = frame;
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
		 * @param {!goog.math.Rect} frame
		 * @param {!goog.math.Coordinate} oldPos
		 * @return {!goog.math.Rect}
		 */
		getMinFrame: function(frame, oldPos) {
			
		},

		/**
		 * @return {!goog.math.Coordinate}
		 */
		getPos: function() {
			return this._frame.getTopLeft();
		},

		/**
		 * @return {!Element}
		 */
		getDOMElement: function() {
		},


		/**
		 * @protected
		 */
		_reloadStyleSize: function() {},
		
		/**
		 * @protected
		 */
		_init: function () {},

		/**
		 * @returns {!Element}
		 * @protected
		 */
		_initBorder: function () {
			/** @protected {imageApp.view.Border} */
			this._border = new imageApp.view.Border(this._frame);
			this._initCorners();
			return this._border.getDOMElement();
		},

		/**
		 * @protected
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