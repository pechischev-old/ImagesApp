goog.provide("model.AppModel");


goog.require("model.Image");

goog.scope(function() {

    model.AppModel = goog.defineClass(null, {
        constructor: function() {

            alert("created model");
            /** @private {Array} */
            this._images = [];
        },

        addImage: function() {
            var image = new model.Image(new goog.math.Rect(10, 10, 250, 250));
            this._images.push(image);
        },
        
        outputLog: function() {

            for (var i = 0; i < this._images.length; ++i)
            {
                console.log("###  images: " + (i + 1));
                this._images[i].outputLog();
            }
        }
    });
});