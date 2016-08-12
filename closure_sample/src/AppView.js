goog.provide("AppView");


goog.require("goog.dom");
goog.require("view.ImageView");
goog.require("view.Toolbar");
goog.require("view.InputForm");

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
            fragment.appendChild(this._createFileReader());
            fragment.appendChild(this._createCanvas());
            document.body.appendChild(fragment);
            /** @private {Array<view.ImageView>} */
            this._images = [];
        },
        
        /** @param {function(?Event)} action */
        setActionFileReader: function(action){
            //this._inputForm.onchange = 'action';
        },

        /** @return {string} */
        getDataInputForm: function() {
            return this._inputForm.getValue();
        },
        
        clickFileReader: function() {
            return this._fileReader.click();
        },

        /** @param {!goog.math.Rect} frame
          * @param {string} path */
        loadImage: function(frame, path) {
            /** @type {view.ImageView} */
            var image = new imageView(frame, path);
            this._canvas.appendChild(image.getDOMElement());
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
            /** @private {view.InputForm} */
            this._inputForm = new view.InputForm();
            return this._inputForm.getDOMElement();
        },

        /**
         * @return {!Element}
         * @private
         */
        _createFileReader: function() {
            /** @private {!Element} */
            this._fileReader = document.createElement(goog.dom.TagName.INPUT);
            this._fileReader.type = "file";
            goog.style.setStyle(this._fileReader, "display", "none");
            return this._fileReader;
        },

        /** @private
         * @return {!Element} */
        _createToolbar: function () {
            /** @private {view.Toolbar} */
            this._toolbar = new view.Toolbar();
            this._toolbar.appendButton(new view.Button("Undo"));
            this._toolbar.appendButton(new view.Button("Redo"));
            this._toolbar.appendButton(new view.Button("Add image"));
            return this._toolbar.getDOMElement();
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