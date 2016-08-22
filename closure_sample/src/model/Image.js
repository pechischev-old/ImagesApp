goog.provide("model.Image");

goog.require("goog.math.Rect");
goog.require("observer.IObserver");

goog.scope(function(){

    /**
      * @implements {observer.IObservable}
      * @param {!goog.math.Rect} frame
      * @constructor
      */
    model.Image = goog.defineClass(null, {
	    /**
         * @param {!goog.math.Rect} frame
         */
        constructor: function(frame) {
            /** @private {Array<observer.IObserver>}*/
            this._observers = [];

            this.setFrame(frame);

            /** @private {boolean}*/
            this._isChange = false;
        },

        /** 
         * @param {observer.IObserver} observer
         */
        registerObserver:function(observer) {
            this._observers.push(observer);
        },
        
        /** 
         * @param {observer.IObserver} observer 
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
         * @return {!goog.math.Rect} 
         */
        getFrame: function() {
            return new goog.math.Rect(this._pos.x, this._pos.y, this._size.width, this._size.height);
        },

        /** 
         * @param {!goog.math.Coordinate} mousePos 
         */
        resize: function(mousePos) {
            var w = (mousePos.x - this._pos.x) || 50;
            var h = (mousePos.y - this._pos.y) || 50;
            /** @private {goog.math.Size} */
            this._size = new goog.math.Size(w, h);
        },
	    /**
         * @param {!goog.math.Coordinate} mousePos
         */
        setCoordinatesOfMouseFirstClick: function(mousePos){
            /** @private {!goog.math.Coordinate} */
            this._shift = goog.math.Coordinate.difference(mousePos, this._pos);
        },

        /** 
         * @param {!goog.math.Coordinate} mousePos 
         */
        move: function(mousePos) {
            /** @private {!goog.math.Coordinate} */
            this._pos = goog.math.Coordinate.difference(mousePos, this._shift);
            this._isChange = true;
            this.notifyObservers();
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