goog.provide("imageApp.model.Object");

goog.require("goog.math.Rect");
goog.require("imageApp.observer.IObserver");


goog.scope(function(){

	/**
	 * @implements {imageApp.observer.IObservable}
	 * @param {!goog.math.Rect} frame
	 * @constructor
	 */
	imageApp.model.Object = goog.defineClass(null, {
		/**
		 * @param {!goog.math.Rect} frame
		 */
		constructor: function(frame) {
			/** @private {Array<imageApp.observer.IObserver>}*/
			this._observers = [];
			this.setFrame(frame);

			/** @private {boolean}*/
			this._isRemoved = false;

			/** @private {boolean}*/
			this._canRemove = true;
		},

		/**
		 * @returns {boolean}
		 */
		hasRemoved: function () {
			return this._isRemoved;
		},

		/**
		 * @param {boolean} isRemoved
		 */
		setRemoved: function (isRemoved) {
			this._isRemoved = isRemoved;
		},

		/**
		 * @param {imageApp.observer.IObserver} observer
		 */
		registerObserver:function(observer) {
			this._observers.push(observer);
		},

		/**
		 * @param {imageApp.observer.IObserver} observer
		 */
		removeObserver:function (observer) {
			var index =  this._observers.indexOf(observer);
			if (index >= 0) {
				this._observers.splice(index, 1);
			}
		},

		notifyObservers: function() {
			var thisPtr = this;
			this._observers.forEach(function(item) {
				item.update(thisPtr.getFrame());
			});
		},

		/**
		 * @returns {boolean}
		 */
		isDeleted: function () {
			return this._canRemove;
		},

		/**
		 * @param {boolean} canRemove
		 */
		canRemove: function(canRemove) {
			this._canRemove = canRemove;
		},


		/**
		 * @param {!goog.math.Rect} frame
		 */
		setFrame: function(frame) {
			/** @private {!goog.math.Rect} */
			this._frame = frame;
			this.notifyObservers();
		},

		/**
		 * @param {!goog.math.Coordinate} pos
		 */
		setPosition: function(pos) {
			this._frame.left = pos.x;
			this._frame.top = pos.y;
			this.notifyObservers();
		},

		/**
		 * @return {string}
		 */
		getType: function () {
			
		},

		/**
		 * @return {!goog.math.Rect}
		 */
		getFrame: function() {
			return this._frame;
		}

	});
});