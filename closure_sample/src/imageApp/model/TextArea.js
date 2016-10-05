goog.provide("imageApp.model.TextArea");

goog.require("imageApp.model.Object");
goog.require("imageApp.events.Event");
goog.require("imageApp.Constants");

goog.scope(function(){
	const MIN_WIDTH = 100;
	/**
	 * @param {!goog.math.Rect} frame
	 * @param {string=} text
	 * @extends {imageApp.model.Object}
	 * @constructor
	 */
	imageApp.model.TextArea = goog.defineClass(imageApp.model.Object, {
		/**
		 * @param {!goog.math.Rect} frame
		 * @param {string} text
		 */
		constructor: function(frame, text) {
			goog.base(this, frame);
			/** @private {string} */
			this._text = (text) ? text : "";
			
			goog.events.listen(this, imageApp.events.EventType.AUTOSIZE_TEXTAREA, function (event) {
				var newFrame = this._frame.clone();
				newFrame.height = event.param;
				if (!goog.math.Rect.equals(this._frame, newFrame))
				{
					this.setFrame(newFrame);
				}
			}, false, this);
		},

		/**
		 * @param {string} text
		 */
		setText: function(text) {
			this._text = text;
			this.dispatchEvent(new imageApp.events.Event(imageApp.events.EventType.TEXT_CHANGED, this._text));
		},

		/**
		 * @return {string}
		 */
		getText: function() {
			return this._text;
		},

		/**
		 * @inheritDoc
		 */
		getType: function () {
			return imageApp.Constants.TEXTAREA;
		},

		/**
		 * @inheritDoc
		 */
		_calculateMinSize: function(frame) {
			frame.width = MIN_WIDTH > frame.width ?  MIN_WIDTH : frame.width;
		}
	});
});