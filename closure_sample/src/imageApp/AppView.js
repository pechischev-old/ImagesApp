goog.provide("imageApp.AppView");


goog.require("goog.dom");
goog.require("imageApp.view.Toolbar");
goog.require("imageApp.view.InputForm");
goog.require("goog.structs.Map");

goog.require("imageApp.view.ObjectViewFactory");
goog.require("imageApp.handlers.HandlerImage");


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

			/** @private {goog.structs.Map<*, imageApp.view.ObjectView>} */
			this._objectsView = new goog.structs.Map();
			this._initListener();
		},

		/**
		 * @return {*}
		 */
		getKeySelectedObject: function () {
			var keys = this._objectsView.getKeys();
			for (var i = 0; i < keys.length; ++i)
			{
				if (this._objectsView.get(keys[i]).isSelected())
				{
					return keys[i];
				}
			}
			return null;
		},


		_deselectObjects: function () {
			var keys = this._objectsView.getKeys();
			for (var i = 0; i < keys.length; ++i)
			{
				this._objectsView.get(keys[i]).setVisibleBorder(false);
			}
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
		 * @returns {!Element}
		 */
		getCanvas: function () {
			return this._canvas;
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
		},

		/**
		 * @private
		 */
		_initListener: function () {
			document.addEventListener("append", goog.bind(function (event){
				/** type {imageApp.model.Object} */
				var model = event.detail;
				var view = imageApp.view.ObjectViewFactory.createObject(model);
				model.registerObserver(view);
				this._canvas.appendChild(view.getDOMElement());
				new imageApp.handlers.HandlerImage(model, view);
				this._objectsView.set(goog.getUid(model), view);
			}, this), false);

			document.addEventListener("remove", goog.bind(function(event){
				/** type {imageApp.model.Object} */
				var model = event.detail;
				var view = this._objectsView.get(goog.getUid(model));
				model.removeObserver(view);
				this._canvas.removeChild(view.getDOMElement());
				this._objectsView.remove(goog.getUid(model));
			}, this), false);
			
			document.addEventListener("deselectObjects", goog.bind(this._deselectObjects, this), false);
		}
	});
});