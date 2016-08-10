goog.provide("AppModel");


goog.require("model.Image");

goog.scope(function() {

    /** @constructor */
    AppModel = goog.defineClass(null, {
        constructor: function() {
            /** @private {Array<model.Image>} */
            this._images = [];
            /** @private {boolean}*/
            this._isChange = false;
        },

        /** @return {!goog.math.Rect} */
        addImage: function() {
            this._isChange = true;
            /** @type {model.Image} */
            var image = new model.Image(new goog.math.Rect(200, 200, 250, 250));
            this._images.push(image);
            return image.getFrame();
        },

        outputLog: function() {
            if (this._isChange)
            {
                for (var i = 0; i < this._images.length; ++i)
                {
                    console.log("###  images: " + (i + 1));
                    this._images[i].outLog();
                }
                this._isChange = false;
            }

        }
    });
});