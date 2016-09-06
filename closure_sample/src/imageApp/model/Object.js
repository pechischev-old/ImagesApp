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
			this._isChange = true;

			/** @private {boolean}*/
			this._canRemove = true;
		},

		/**
		 * @returns {boolean}
		 */
		hasChange: function () {
			return this._isChange;
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
			this._isChange = true;
			this.notifyObservers();
		},

		/**
		 * @param {!goog.math.Coordinate} pos
		 */
		setPosition: function(pos) {
			this._frame.left = pos.x;
			this._frame.top = pos.y;
			this._isChange = true;
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
		},

		/**
		 * @param {!number} number
		 */
		outLog: function(number) {
			if (this._isChange)
			{
				var info = this._appendProperties();
				console.log("#### : " + number);
				console.log(info);
				console.log("pos: " + this._frame.left + " " + this._frame.top);
				console.log("size: " + this._frame.width + " " + this._frame.height);
				this._isChange = false;
			}
		},

		/**
		 * @protected
		 * @return {string}
		 */
		_appendProperties: function () {
			
		}
	});
});