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
				console.log("#### image: " + number);
				console.log("pos: " + this._frame.left + " " + this._frame.top);
				console.log("size: " + this._frame.width + " " + this._frame.height);
				this._isChange = false;
			}
		}
	});
});