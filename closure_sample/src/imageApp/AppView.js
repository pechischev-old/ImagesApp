goog.provide("imageApp.AppView");


goog.require("goog.dom");
goog.require("imageApp.view.ImagesView");
goog.require("imageApp.view.Toolbar");
goog.require("imageApp.view.InputForm");



goog.scope(function() {
	/** @const {string} */
	const CANVAS_NAME = "canvas";
	/** @const {!goog.math.Size} */
	const CANVAS_SIZE = new goog.math.Size(1000, 800);

	/**
	 * @constructor
	 */
	imageApp.AppView = goog.defineClass(null, {
		constructor: function() {
			var fragment = document.createDocumentFragment();
			fragment.appendChild(this._createToolbar());
			fragment.appendChild(this._createInputForm());
			fragment.appendChild(this._createFileReader());
			fragment.appendChild(this._createCanvas());
			document.body.appendChild(fragment);

			/** @private {imageApp.view.ImagesView} */
			this._imagesView = new imageApp.view.ImagesView(this._canvas);
		},

		/**
		 * @returns {imageApp.view.ImagesView}
		 */
		getImagesView: function () {
			return this._imagesView;
		},

		/**
		 * @param {Function} action
		 */
		setActionFileReader: function(action){
			this._fileReader.onchange = action;
		},

		/**
		 * @return {string}
		 */
		getDataInputForm: function() {
			return this._inputForm.getValue();
		},

		clickFileReader: function() {
			return this._fileReader.click();
		},

		/**
		 * @return {imageApp.view.Toolbar}
		 */
		getToolbar: function() {
			return this._toolbar;
		},

		/** 
		 * @return {!Element}
		 * @private
		 */
		_createInputForm: function () {
			/** @private {imageApp.view.InputForm} */
			this._inputForm = new imageApp.view.InputForm();
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
			this._fileReader.setAttribute("accept", "image/*");
			goog.style.setStyle(this._fileReader, "display", "none");
			return this._fileReader;
		},

		/**
		 * @private
		 * @return {!Element}
		 */
		_createToolbar: function () {
			/** @private {imageApp.view.Toolbar} */
			this._toolbar = new imageApp.view.Toolbar();
			return this._toolbar.getDOMElement();
		},

		/**
		 * @private
		 * @return {!Element}
		 */
		_createCanvas: function () {
			/** @private {!Element} */
			this._canvas = goog.dom.createElement(goog.dom.TagName.DIV);
			this._canvas.id = CANVAS_NAME;
			goog.style.setStyle(this._canvas, "width", CANVAS_SIZE.width + "px");
			goog.style.setStyle(this._canvas, "height", CANVAS_SIZE.height  + "px");
			return this._canvas;
		}
	});
});