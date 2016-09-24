goog.provide("imageApp.view.ObjectView");

goog.require("imageApp.view.Frame");
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
		 * @param {!imageApp.model.Object} object
		 */
		constructor: function(frame, object) {
			goog.base(this);
			/** @protected {!goog.math.Rect} */
			this._frame = frame;
			/** @protected {!imageApp.model.Object} */
			this._model = object;
		},

		/**
		 * @return {boolean}
		 */
		isSelected: function () {
			return this._border.isSelected();
		},

		/**
		 * @param {!goog.math.Rect} frame
		 */
		update: function(frame) {
			this.setFrame(frame);
		},

		/**
		 * @param {boolean} isVisible
		 */
		setVisibleBorder: function(isVisible) {
			this._border.setVisibleBorder(isVisible);
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
		 * @returns {imageApp.view.Frame}
		 */
		getBorder: function () {
			return this._border;
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
			/** @protected {imageApp.view.Frame} */
			this._border = new imageApp.view.Frame(this._frame);
			return this._border.getDOMElement();
		}
	});
});