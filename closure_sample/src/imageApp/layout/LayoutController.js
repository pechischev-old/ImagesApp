goog.provide("imageApp.layout.LayoutController");


goog.require("imageApp.layout.Layout");
goog.require("goog.events.EventTarget");
goog.require("imageApp.command.SelectTypeLayout");
goog.require("imageApp.command.ResetLayout");

goog.scope(function () {
	var SelectTypeLayout = imageApp.command.SelectTypeLayout;

	const BORDER = 50;
	const INDENT = 20;
	const CANVAS_SIZE = new goog.math.Size(1000, 800);
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
				this._isAutoAlignment = false;
			}, this));
		},

		resetLayout: function () {
			console.log(this._isAutoAlignment);
			if (this._isAutoAlignment)
			{
				return;
			}
			var action = new imageApp.command.ResetLayout(this, this._isAutoAlignment);
			this._history.recordAction(action);
		},

		/**
		 * @param {boolean} canAutoAlignment
		 */
		setAutoAlignment: function (canAutoAlignment) {
			this._isAutoAlignment = canAutoAlignment;
			this._updateLayout();
		},

		/**
		 * @param {string} type
		 */
		selectTypeLayout: function (type) {
			if (type != this._typeLayout)
			{
				this._isAutoAlignment = true;
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
				console.log("auto align off");
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

				this._header.setFrame(this._getChangedFrame(hFrame, BORDER, BORDER, CANVAS_SIZE.width * 0.6 - BORDER, null));
				this._description.setFrame(this._getChangedFrame(dFrame, hFrame.left, hFrame.height + hFrame.top + INDENT, CANVAS_SIZE.width * 0.6 - BORDER, null));
				this._media.setFrame(this._getChangedFrame(mFrame, hFrame.left + hFrame.width + INDENT, hFrame.top, CANVAS_SIZE.width * 0.4 - BORDER , null));
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
				this._media.setFrame(this._getChangedFrame(mFrame, hFrame.left, dFrame.height + dFrame.top + INDENT,  CANVAS_SIZE.width - 2 * BORDER , null));
			}
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