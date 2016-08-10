goog.provide("AppView");


goog.require("goog.dom");
goog.require("view.ImageView");

goog.scope(function() {
    /** @const {goog.math.Size} */
    const CANVAS_SIZE = new goog.math.Size(1000, 800);
    /** @const {string} */
    const CANVAS_NAME = "testCanvas";
    /** @type {view.ImageView} */
    var imageView = view.ImageView;


    /** @constructor */
    AppView = goog.defineClass(null, {
        constructor: function() {
            var fragment = document.createDocumentFragment();
            fragment.appendChild(this._createButton());
            fragment.appendChild(this._createInputForm());
            fragment.appendChild(this._createCanvas());
            document.body.appendChild(fragment);
            /** @private {string} */
            this._path = "http://igry-goda.ru/igry-2013/index.files/Luchshie-strelyalki-na-PK-2013-goda.jpg";

            /** @private {Array<view.ImageView>} */
            this._images = [];
        },

        /** @return {string} */
        getPath: function() {
            return this._path;
        },

        /** @param {!goog.math.Rect} frame
          * @param {string} path */
        loadImage: function(frame, path) {
            var canvas = document.getElementById(CANVAS_NAME);
            /** @type {view.ImageView} */
            var image = new imageView(frame, path);
            canvas.appendChild(image.createStructDOM());
            this._images.push(image);
        },

        /** 
         * @return {!Element}
         * @private
         */
        _createInputForm: function () {
            var inputForm = document.createElement(goog.dom.TagName.INPUT);
            inputForm.id = "imageInput";
            return inputForm;
        },

        /** @private 
          * @return {!Element}*/
        _createButton: function() {
            // create class Button for simple Toolbar
            /**
             * @type {!Element}
             * @private
             */
            var btn = goog.dom.createElement(goog.dom.TagName.BUTTON);
            btn.id = "loading";
            return btn;
        },
        /** @private 
          * @return {!Element} */
        _createCanvas: function () {
            /** @private {!Element} */
            this._canvas = goog.dom.createElement(goog.dom.TagName.CANVAS);
            this._canvas.id = CANVAS_NAME;
            this._canvas.width = CANVAS_SIZE.width;
            this._canvas.height = CANVAS_SIZE.height;
            return this._canvas;
        }

    });
});