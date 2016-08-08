goog.provide("Application");

goog.require("AppModel");
goog.require("goog.dom");

goog.require("goog.events");
goog.require("goog.events.EventType");


goog.scope(function() {
    /** @param {AppModel} model 
      * @constructor */
    Application = goog.defineClass(null, {
        constructor: function(model) {
            /** @private {AppModel} */
            this._appModel = model;
            this._createButton();

        },

        update: function () {

        },
        
        run: function() {
            var thisPtr = this;
            var idTimer = setInterval(function () {
                thisPtr._appModel.outputLog();
            }, 40);
        },

        /** @private */
        _createButton: function() {
            /**
             * @type {!Element}
             * @private
             */
            this._btn = goog.dom.createElement(goog.dom.TagName.BUTTON);
            this._btn.id = "loading";
            this._btn.style.width = "70px";
            this._btn.style.height = "50px";
            this._btn.style.left = "20px";
            this._btn.style.top = "30px";
            document.body.appendChild( this._btn);
            
            goog.events.listen(this._btn, goog.events.EventType.CLICK, goog.bind(this._appModel.addImage, this._appModel));
        }
    });
});