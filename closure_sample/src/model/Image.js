goog.provide("model.Image");

goog.require("goog.math.Rect");

goog.scope(function(){

    /**
      * @param {!goog.math.Rect} frame
      * @constructor
      */
    model.Image = goog.defineClass(null, {
        constructor: function(frame) {
            /** @private {boolean} */
            this._isSelected = false;

            /** @private {!goog.math.Size} */
            this._size = frame.getSize();
            /** @private {!goog.math.Coordinate} */
            this._pos = frame.getTopLeft();
        },

        /** @return {!goog.math.Rect} */
        getFrame: function() {
            return new goog.math.Rect(this._pos.x, this._pos.y, this._size.width, this._size.height);
        },

        /** @return {boolean} */
        isSelected: function() {
            return this._isSelected;
        },

        /** @param {boolean} flag */
        setSelected: function(flag) {
            this._isSelected = flag;
        },

        /** @param {!goog.math.Coordinate} posMouse */
        resize: function(posMouse) {
            var w = (posMouse.x - this._pos.x) || 50;
            var h = (posMouse.y - this._pos.y) || 50;
            /** @private {goog.math.Size} */
            this._size = new goog.math.Size(w, h);
        },

        /** @param {!goog.math.Coordinate} posMouse */
        move: function(posMouse) {
            /** @type {!goog.math.Coordinate} */
            var shift = goog.math.Coordinate.difference(posMouse, this._pos);
            /** @private {!goog.math.Coordinate} */
            this._pos = goog.math.Coordinate.difference(posMouse, shift);
        },

        outLog: function() {
            console.log(this._pos.x + " " + this._pos.y);
            console.log(this._size.width + " " + this._size.height);
            console.log("selected: " + this.isSelected());
            
        }
    });
});