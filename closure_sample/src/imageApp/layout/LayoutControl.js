goog.provide("imageApp.layout.LayoutControl");

goog.require("imageApp.layout.Layout");
goog.require("imageApp.layout.MediaLayout");

goog.scope(function () {
	const BORDER = 50;
	const INDENT = 20;
	const CANVAS_SIZE = new goog.math.Size(1000, 800);
	
	/**
	 * @constructor
	 */
	imageApp.layout.LayoutControl = goog.defineClass(null, {
		constructor: function () {
			/** @private {?imageApp.layout.Layout} */
			this._header = null;
			/** @private {?imageApp.layout.Layout} */
			this._description = null;
			/** @private {?imageApp.layout.MediaLayout} */
			this._media = null;
			
			/** @private {string} */
			this._typeLayout = "default";
		},

		/**
		 * @returns {string}
		 */
		getTypeLayout: function () {
			return this._typeLayout;
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		initHeaderLayout: function(object) {
			this._header = new imageApp.layout.Layout(object);
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		initDescriptionLayout: function(object) {
			this._description = new imageApp.layout.Layout(object);
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		initMediaLayout: function(object) {
			this._media = new imageApp.layout.MediaLayout(object);
		},

		/**
		 * @private
		 */
		_choiceLayoutOnType: function () {
			if (this._typeLayout == "default")
			{
				this.setDefaultLayout();
			}
			else if ( this._typeLayout == "horizontal")
			{
				this.setHorizontalLayout();
			}
			
		},

		setDefaultLayout: function () {
			this._typeLayout = "default";
			var hFrame = this._header.getFrame();
			var dFrame = this._description.getFrame();
			if (this._media)
			{
				var mFrame = this._media.getFrame();

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
		
		setHorizontalLayout: function () {
			this._typeLayout = "horizontal";
			if (!this._media)
			{
				document.dispatchEvent(new Event("append media"));
			}
			var hFrame = this._header.getFrame();
			var dFrame = this._description.getFrame();
			var mFrame = this._media.getFrame();
			this._header.setFrame(this._getChangedFrame(hFrame, BORDER, BORDER, CANVAS_SIZE.width - 2 * BORDER, null));
			this._description.setFrame(this._getChangedFrame(dFrame, hFrame.left, hFrame.height + hFrame.top + INDENT, CANVAS_SIZE.width - 2 * BORDER, null));
			this._media.setFrame(this._getChangedFrame(mFrame, hFrame.left, dFrame.height + dFrame.top + INDENT,  CANVAS_SIZE.width - 2 * BORDER , null));
		},

		removeMediaLayout: function () {
			this._media = null;
			this._choiceLayoutOnType();
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
		}
	});
});