goog.provide("imageApp.layout.LayoutControl");

goog.require("imageApp.layout.Layout");
goog.require("imageApp.layout.MediaLayout");

goog.scope(function () {
	const BORDER = 50;
	const INDENT = 20;
	const CANVAS_SIZE = new goog.math.Size(1000, 800);
	/**
	 * @contructor
	 */
	imageApp.layout.LayoutControl = goog.defineClass(null, {
		constructor: function () {
			/** @private {null} */
			this._header = null;
			/** @private {null} */
			this._description = null;
			/** @private {null} */
			this._media = null;
			
			/** @private {string} */
			this._typeLayout = "default";
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		initHeaderLayout: function(object) {
			/** @private {imageApp.layout.Layout} */
			this._header = new imageApp.layout.Layout(object);
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		initDescriptionLayout: function(object) {
			/** @private {imageApp.layout.Layout} */
			this._description = new imageApp.layout.Layout(object);
		},

		update: function () {
			
			var frame = this._header.getFrame();
			frame.width = CANVAS_SIZE.width - 2 *BORDER;
			this._header.setFrame(frame);

			var nframe = this._description.getFrame();
			nframe.width = CANVAS_SIZE.width - 2 *BORDER;
			nframe.top = frame.height + nframe.top + INDENT;

			this._description.setFrame(nframe);
		}
	});
});