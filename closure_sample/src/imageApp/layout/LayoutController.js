goog.provide("imageApp.layout.LayoutController");


goog.require("imageApp.layout.Layout");
goog.require("goog.events.EventTarget");
goog.require("imageApp.command.SelectTypeLayout");
goog.require("imageApp.command.ResetLayout");
goog.require("imageApp.command.AddMediaCommand");
goog.require("imageApp.command.RemoveMediaCommand");

goog.scope(function () {
	var SelectTypeLayout = imageApp.command.SelectTypeLayout;
	var AddMediaCommand = imageApp.command.AddMediaCommand;
	var RemoveMediaCommand = imageApp.command.RemoveMediaCommand;

	const BORDER = 50;
	const INDENT = 20;
	const CANVAS_SIZE = new goog.math.Size(1000, 800);
	/** @const {!goog.math.Size} */
	const MAX_SIZE = new goog.math.Size(512, 256);
	/**
	 * @param {imageApp.AppModel} model
	 * @param {imageApp.command.History} history
	 * @param {imageApp.ObjectCollection} collection
	 * @extends {goog.events.EventTarget}
	 * @constructor
	 */
	imageApp.layout.LayoutController = goog.defineClass(goog.events.EventTarget, {
		/**
		 * @param {imageApp.AppModel} model
		 * @param {imageApp.command.History} history
		 * @param {imageApp.ObjectCollection} collection
		 */
		constructor: function (model, history, collection) {
			goog.base(this);
			/** @private {imageApp.AppModel} */
			this._model = model;
			/** @private {imageApp.command.History} */
			this._history = history;
			/** @private {imageApp.ObjectCollection} */
			this._collection = collection;

			/** @private {!imageApp.layout.Layout} */
			this._header = this._initLayout("Заголовок");
			/** @private {!imageApp.layout.Layout} */
			this._description = this._initLayout("Описание");
			/** @private {?imageApp.layout.Layout} */
			this._media = null;

			goog.events.listen(this, imageApp.events.EventType.LAYOUT_CHANGED, goog.bind(this._updateLayout, this));

			/** @private {string} */
			this._typeLayout = "default";
			/** @private {boolean} */
			this._isAutoAlignment = true;
			this._updateLayout();

			goog.events.listen(this, imageApp.events.EventType.OFF_AUTOALIGN,  goog.bind(function () {
				//this.selectTypeLayout("custom");
				this.resetLayout(false);
			}, this));
		},

		/**
		 * @returns {boolean}
		 */
		hasAddedMedia: function () {
			return this._media != null;
		},

		/**
		 * @param {!imageApp.model.Object} object
		 */
		appendMedia: function (object) {
			if (!this._media)
			{
				var action = new imageApp.command.AddMediaCommand(this, this._collection, object);
				this._history.recordAction(action);
			}
		},
		
		removeMedia: function () {
			if (this._media)
			{
				var action = new imageApp.command.RemoveMediaCommand(this, this._collection, this._media.getObject());
				this._history.recordAction(action);
			}
		},

		removeMediaLayout: function () {
			this._media = null;
			this._updateLayout();
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		initMediaLayout: function (object) {
			this._media = new imageApp.layout.Layout(object);
			this._media.setParentEventTarget(this);
			this._updateLayout();
		},

		/**
		 * @param {boolean} isAlign
		 */
		resetLayout: function (isAlign) {
			//console.log(this._isAutoAlignment);
			if (isAlign == this._isAutoAlignment)
			{
				return;
			}
			var action = new imageApp.command.ResetLayout(this, isAlign);
			this._history.recordAction(action);
		},

		/**
		 * @param {boolean} canAutoAlignment
		 */
		setAutoAlignment: function (canAutoAlignment) {
			console.log("auto align " +  canAutoAlignment);
			this._isAutoAlignment = canAutoAlignment;
			this._updateLayout();
		},

		/**
		 * @param {string} type
		 */
		selectTypeLayout: function (type) {
			this._isAutoAlignment = true;
			this._updateLayout();
			if (type != this._typeLayout)
			{
				console.log("current type layout: " + type );
				var action = new SelectTypeLayout(this, type);
				this._history.recordAction(action);
			}
		},

		/**
		 * @param {string} type
		 */
		setTypeLayout: function (type) {
			this._typeLayout = type;
			this._updateLayout();
		},

		/**
		 * @returns {string}
		 */
		getTypeLayout: function () {
			return this._typeLayout;
		},


		/**
		 * @private
		 */
		_updateLayout: function () {
			if (!this._isAutoAlignment)
			{
				return;
			}
			if (this._typeLayout == "default")
			{
				this._setDefaultLayout();
			}
			else if ( this._typeLayout == "horizontal")
			{
				this._setHorizontalLayout();
			}

		},

		_setDefaultLayout: function () {
			var hFrame = this._header.getFrame().clone();
			var dFrame = this._description.getFrame().clone();
			if (this._media)
			{

				var mFrame = this._media.getFrame().clone();
				var width = CANVAS_SIZE.width * 0.4 - BORDER > mFrame.width ? mFrame.width : CANVAS_SIZE.width * 0.4 - BORDER;
				var size = this._getCalculatingAppropriateSize(new goog.math.Size(width, mFrame.height));
				this._media.setFrame(this._getChangedFrame(mFrame, CANVAS_SIZE.width - BORDER - size.width , BORDER, size.width , size.height));

				this._header.setFrame(this._getChangedFrame(hFrame, BORDER, BORDER,  mFrame.left - BORDER - INDENT, null));
				this._description.setFrame(this._getChangedFrame(dFrame, hFrame.left, hFrame.height + hFrame.top + INDENT, mFrame.left - BORDER - INDENT, null));
			}
			else
			{
				this._header.setFrame(this._getChangedFrame(hFrame, BORDER, BORDER, CANVAS_SIZE.width - 2 * BORDER, null));
				this._description.setFrame(this._getChangedFrame(dFrame, hFrame.left, hFrame.height + hFrame.top + INDENT, CANVAS_SIZE.width - 2 * BORDER, null));
			}
		},

		_setHorizontalLayout: function () {
			var hFrame = this._header.getFrame().clone();
			var dFrame = this._description.getFrame().clone();

			this._header.setFrame(this._getChangedFrame(hFrame, BORDER, BORDER, CANVAS_SIZE.width - 2 * BORDER, null));
			this._description.setFrame(this._getChangedFrame(dFrame, hFrame.left, hFrame.height + hFrame.top + INDENT, CANVAS_SIZE.width - 2 * BORDER, null));
			if (this._media)
			{
				var mFrame = this._media.getFrame().clone();
				var width = CANVAS_SIZE.width * 0.4 - BORDER > mFrame.width ? mFrame.width : CANVAS_SIZE.width * 0.4 - BORDER;
				var size = this._getCalculatingAppropriateSize(new goog.math.Size(width, mFrame.height));
				this._media.setFrame(this._getChangedFrame(mFrame, hFrame.left + CANVAS_SIZE.width / 2 - size.width / 2, dFrame.height + dFrame.top + INDENT, size.width, size.height));
			}
		},

		/**
		 * @param {!goog.math.Size} size
		 * @return {!goog.math.Size}
		 * @private
		 */
		_getCalculatingAppropriateSize: function(size) {
			var width = size.width;
			var height = size.height;
			var coeff = ( width > height) ? width / MAX_SIZE.width : height / MAX_SIZE.height;
			width = (width > MAX_SIZE.width) ? width / coeff : width;
			height = (height > MAX_SIZE.height) ? height / coeff : height;
			return new goog.math.Size(width, height);
		},

		/**
		 * @param {!goog.math.Rect} frame
		 * @param {null|number} left
		 * @param {null|number} top
		 * @param {null|number} width
		 * @param {null|number} height
		 * @return {!goog.math.Rect}
		 * @private
		 */
		_getChangedFrame: function (frame, left, top, width, height) {
			frame.left = (left) ? left : frame.left;
			frame.top = (top) ? top : frame.top;
			frame.width = (width) ? width : frame.width;
			frame.height = (height) ? height : frame.height;
			return frame;
		},

		/**
		 * @param {string} text
		 * @returns {!imageApp.layout.Layout}
		 * @private
		 */
		_initLayout: function (text) {
			/** @type {imageApp.model.TextArea} */
			var textarea = this._model.createTextArea(text);
			this._collection.appendObject(textarea);
			var layout = new imageApp.layout.Layout(textarea);
			layout.setParentEventTarget(this);
			return layout;
		}
	});
});