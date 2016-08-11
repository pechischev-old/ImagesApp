goog.provide("AppView");


goog.require("goog.dom");
goog.require("view.ImageView");
goog.require("view.Toolbar");

goog.scope(function() {
    /** @const {string} */
    const CANVAS_NAME = "canvas";
    /** @type {view.ImageView} */
    var imageView = view.ImageView;

    /** @constructor */
    AppView = goog.defineClass(null, {
        constructor: function() {
            var fragment = document.createDocumentFragment();
            fragment.appendChild(this._createToolbar());
            fragment.appendChild(this._createInputForm());
            fragment.appendChild(this._createCanvas());
            document.body.appendChild(fragment);
            /** @private {string} */
            this._path = "http://igry-goda.ru/igry-2013/index.files/Luchshie-strelyalki-na-PK-2013-goda.jpg";

            /** @private {Array<view.ImageView>} */
            this._images = [];
        },

        /** @return {string} */ // temporarily
        getPath: function() {
            return this._path;
        },

        /** @param {!goog.math.Rect} frame
          * @param {string} path */
        loadImage: function(frame, path) {
            /** @type {view.ImageView} */
            var image = new imageView(frame, path);
            this._canvas.appendChild(image.createStructDOM());
            this._images.push(image);
        },

        /** @return {view.Toolbar} */
        getToolbar: function() {
            return this._toolbar;
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
         * @return {!Element} */
        _createToolbar: function () {
            /** @private {view.Toolbar} */
            this._toolbar = new view.Toolbar();
            this._toolbar.appendButton(this._createButton("Undo"));
            this._toolbar.appendButton(this._createButton("Redo"));
            this._toolbar.appendButton(this._createButton("Add image"));
            return this._toolbar.getDOMElement();
        },

        /** @private
          * @param {string} name
          * @return {view.Button}*/
        _createButton: function(name) {

            var b = new view.Button(name);
            b.setAction(function() { console.log(name)});
            return b;
        },
        /** @private 
          * @return {!Element} */
        _createCanvas: function () {
            /** @private {!Element} */
            this._canvas = goog.dom.createElement(goog.dom.TagName.DIV);
            this._canvas.id = CANVAS_NAME;
            return this._canvas;
        }

    });
});