goog.provide("AppModel");


goog.require("model.Image");

goog.scope(function() {

    /**
     
     * @constructor
     * */
    AppModel = goog.defineClass(null, {
        constructor: function() {
            /** @private {Array<model.Image>} */
            this._images = [];
          
        },
        
        /** @return {model.Image} */
        addImage: function() {
            /** @type {model.Image} */
            var image = new model.Image(new goog.math.Rect(200, 200, 250, 250));
            this._images.push(image);
            return image;
        },

        /** @param {!number} index
         * @return {model.Image} */
        getImageOfIndex: function(index) {
            if (this._images.length <= index || index < 0)
            {
                throw new Error("out of range");
            }
            return this._images[index];
        },

        outputLog: function() {
            for (var i = 0; i < this._images.length; ++i)
            {
                this._images[i].outLog(i);
            }
            
        }
    });
});