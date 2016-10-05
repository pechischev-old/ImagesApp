goog.provide("imageApp.layout.LayoutController");


goog.require("imageApp.layout.Layout");
goog.require("imageApp.layout.MediaLayout");
goog.require("goog.events.EventTarget");
goog.require("imageApp.command.SelectTypeLayout");
goog.require("imageApp.command.ResetLayout");
goog.require("imageApp.command.AddMediaCommand");
goog.require("imageApp.command.RemoveMediaCommand");
goog.require("imageApp.command.MetaCommand");
goog.require("imageApp.command.ResizeCommand");
goog.require("imageApp.Constants");

goog.scope(function () {
	var SelectTypeLayout = imageApp.command.SelectTypeLayout;
	var Constants = imageApp.Constants;
	var ResizeAction = imageApp.command.ResizeCommand;

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
			this._header = this._initLayout(Constants.HEADER);
			/** @private {!imageApp.layout.Layout} */
			this._description = this._initLayout(Constants.DESCRIPTION);
			/** @private {?imageApp.layout.MediaLayout} */
			this._media = null;

			/** @private {string} */
			this._typeLayout = Constants.DEFAULT_LAYOUT;
			/** @private {boolean} */
			this._isAutoAlignment = true;
			/** @private {boolean} */
			this._isBegin = true;
			this.setLayout(Constants.DEFAULT_LAYOUT);
			this._isBegin = false;

			goog.events.listen(this, imageApp.events.EventType.OFF_AUTOALIGN, goog.bind(function(event) {
				this._resetLayout(false, event.action);
			}, this));
			/*goog.events.listen(this, imageApp.events.EventType.LAYOUT_CHANGED, goog.bind(function () {
				var command = new imageApp.command.MetaCommand();
				this._updateLayout(command);
				this._history.recordAction(command);
			}, this));*/
		},

		/**
		 * @param {string} type
		 */
		setLayout: function (type) {
			var command = new imageApp.command.MetaCommand();
			this._resetLayout(true, command);
			command.execute();
			if (type != this._typeLayout)
			{
				var action = new SelectTypeLayout(this, type);
				action.execute();
				command.appendAction(action);
			}
			this._updateLayout(command);
			if (!this._isBegin && !command.isEmpty())
			{
				this._history.recordExecuteAction(command);
			}
		},

		/**
		 * @param {imageApp.command.MetaCommand} command
		 * @private
		 */
		_updateLayout: function (command) {
			if (!this._isAutoAlignment)
			{
				return;
			}
			if (this._typeLayout == Constants.DEFAULT_LAYOUT)
			{
				this._setDefaultLayout(command);
			}
			else if ( this._typeLayout == Constants.HORIZONTAL_LAYOUT)
			{
				this._setHorizontalLayout(command);
			}
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
				var command = new imageApp.command.MetaCommand();
				var action = new imageApp.command.AddMediaCommand(this, this._collection, object);
				action.execute();
				command.appendAction(action);
				this._updateLayout(command);
				this._history.recordExecuteAction(command);
			}
		},
		
		removeMedia: function () {
			if (this._media)
			{
				var command = new imageApp.command.MetaCommand();
				var action =new imageApp.command.RemoveMediaCommand(this, this._collection, this._media.getObject());
				action.execute();
				command.appendAction(action);
				this._updateLayout(command);
				this._history.recordExecuteAction(command);
			}
		},

		removeMediaLayout: function () {
			this._media = null;
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		initMediaLayout: function (object) {
			this._media = new imageApp.layout.MediaLayout(object);
			this._media.setParentEventTarget(this);
		},

		/**
		 * @param {boolean} isAlign
		 * @param {imageApp.command.MetaCommand} command
		 * @private
		 */
		_resetLayout: function (isAlign, command) {
			if (isAlign == this._isAutoAlignment)
			{
				return;
			}
			command.appendAction(new imageApp.command.ResetLayout(this, isAlign));
		},


		resetLayout: function () {
			var command = new imageApp.command.MetaCommand();
			this._resetLayout(true, command);
			command.execute();
			this._updateLayout(command);
			this._history.recordExecuteAction(command);
		},

		/**
		 * @param {boolean} canAutoAlignment
		 */
		setAutoAlignment: function (canAutoAlignment) {
			console.log("auto align " + canAutoAlignment);
			this._isAutoAlignment = canAutoAlignment;
		},

		/**
		 * @param {string} type
		 */
		setTypeLayout: function (type) {
			this._typeLayout = type;
		},

		/**
		 * @returns {string}
		 */
		getTypeLayout: function () {
			return this._typeLayout;
		},

		/**
		 * @param {imageApp.command.MetaCommand} command
		 * @private
		 */
		_setDefaultLayout: function (command) {
			var hFrame = this._header.getFrame().clone();
			var dFrame = this._description.getFrame().clone();
			if (this._media)
			{

				var mFrame = this._media.getFirstFrame().clone();
				var width = CANVAS_SIZE.width * 0.4 - BORDER > mFrame.width ? mFrame.width : CANVAS_SIZE.width * 0.4 - BORDER;
				var size = this._getCalculatingAppropriateSize(new goog.math.Size(width, mFrame.height));
				this._writeFrameInCommand(this._getChangedFrame(mFrame, CANVAS_SIZE.width - BORDER - size.width , BORDER, size.width , size.height), this._media.getObject(), command);

				this._writeFrameInCommand(this._getChangedFrame(hFrame, BORDER, BORDER,  mFrame.left - BORDER - INDENT, null), this._header.getObject(), command);
				this._writeFrameInCommand(this._getChangedFrame(dFrame, hFrame.left, hFrame.height + hFrame.top + INDENT, mFrame.left - BORDER - INDENT, null), this._description.getObject(), command);
			}
			else
			{
				this._writeFrameInCommand(this._getChangedFrame(hFrame, BORDER, BORDER, CANVAS_SIZE.width - 2 * BORDER, null), this._header.getObject(), command);
				this._writeFrameInCommand(this._getChangedFrame(dFrame, hFrame.left, hFrame.height + hFrame.top + INDENT, CANVAS_SIZE.width - 2 * BORDER, null), this._description.getObject(), command);
			}
		},

		/**
		 * @param {imageApp.command.MetaCommand} command
		 * @private
		 */
		_setHorizontalLayout: function (command) {
			var hFrame = this._header.getFrame().clone();
			var dFrame = this._description.getFrame().clone();

			this._writeFrameInCommand(this._getChangedFrame(hFrame, BORDER, BORDER, CANVAS_SIZE.width - 2 * BORDER, null), this._header.getObject(), command);
			this._writeFrameInCommand(this._getChangedFrame(dFrame, hFrame.left, hFrame.height + hFrame.top + INDENT, CANVAS_SIZE.width - 2 * BORDER, null), this._description.getObject(), command);
			if (this._media)
			{
				var mFrame = this._media.getFirstFrame().clone();
				var width = CANVAS_SIZE.width * 0.4 - BORDER > mFrame.width ? mFrame.width : CANVAS_SIZE.width * 0.4 - BORDER;
				var size = this._getCalculatingAppropriateSize(new goog.math.Size(width, mFrame.height));
				this._writeFrameInCommand(this._getChangedFrame(mFrame, hFrame.left + CANVAS_SIZE.width / 2 - size.width / 2, dFrame.height + dFrame.top + INDENT, size.width, size.height),
										this._media.getObject(), command);
			}
		},

		/**
		 * @param {!goog.math.Rect} frame
		 * @param {imageApp.model.Object} object
		 * @param {imageApp.command.MetaCommand} command
		 * @private
		 */
		_writeFrameInCommand: function (frame, object, command) {
			if (!goog.math.Rect.equals(frame, object.getFrame()))
			{
				var action = new ResizeAction(object, frame);
				action.execute();
				command.appendAction(action);
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