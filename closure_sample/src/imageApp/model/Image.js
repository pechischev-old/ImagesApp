goog.provide("imageApp.model.Image");

goog.require("goog.math.Rect");
goog.require("imageApp.observer.IObserver");

goog.scope(function(){

	/**
	  * @implements {imageApp.observer.IObservable}
	  * @param {!goog.math.Rect} frame
	  * @param {string} path
	  * @constructor
	  */
	imageApp.model.Image = goog.defineClass(null, {
		/**
		 * @param {!goog.math.Rect} frame
		 * @param {string} path
		 */
		constructor: function(frame, path) {
			/** @private {Array<imageApp.observer.IObserver>}*/
			this._observers = [];
			this._path = path;
			this.setFrame(frame);

			/** @private {boolean}*/
			this._isChange = false;
		},

		/**
		 * @return {string}
		 */
		getPath: function () {
			return this._path;
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
		 * @param {!goog.math.Rect} frame 
		 */
		setFrame: function(frame) {
			/** @private {!goog.math.Size} */
			this._size = frame.getSize();
			/** @private {!goog.math.Coordinate} */
			this._pos = frame.getTopLeft();
			this._isChange = true;
			this.notifyObservers();
		},

		/**
		 * @param {!goog.math.Coordinate} pos
		 */
		setPosition: function(pos) {
			/** @private {!goog.math.Coordinate} */
			this._pos = pos;
			this._isChange = true;
			this.notifyObservers();
		},

		/**
		 * @return {!goog.math.Rect} 
		 */
		getFrame: function() {
			return new goog.math.Rect(this._pos.x, this._pos.y, this._size.width, this._size.height);
		},

		/** 
		 * @param {!number} number 
		 */
		outLog: function(number) {
			if (this._isChange)
			{
				console.log("#### image: " + number);
				console.log(this._pos.x + " " + this._pos.y);
				console.log(this._size.width + " " + this._size.height);
				this._isChange = false;
			}
		}
	});
});