goog.provide("imageApp.view.TextAreaView");

goog.require("goog.dom");
goog.require("imageApp.view.ObjectView");

goog.scope(function() {
	const MIN_WIDTH = 50;
	/**
	 * @param {!goog.math.Rect} frame
	 * @extends {imageApp.view.ObjectView}
	 * @constructor
	 */
	imageApp.view.TextAreaView = goog.defineClass(imageApp.view.ObjectView, {
		/**
		 * @param {!goog.math.Rect} frame
		 */
		constructor: function(frame) {
			goog.base(this, frame);
			this._init();
		},

		/**
		 * @inheritDoc
		 */
		getDOMElement: function(){
			return this._container;
		},


		/**
		 * @inheritDoc
		 */
		getMinFrame: function (frame, oldPos) {
			frame.height = this._frame.height;
			frame.width = Math.max(MIN_WIDTH, frame.width);
			return frame;
		},

		/**
		 * @param {string} text
		 */
		setText: function(text) {
			this._textArea.value = text;
			this._initResizeArea(30);
		},

		/**
		 * @return {string}
		 */
		getText: function () {
			return this._textArea.value;
		},

		/**
		 * @inheritDoc
		 */
		_reloadStyleSize: function() {
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);

			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), this._textArea);
			goog.style.setStyle(this._hiddenDiv, "width", this._frame.width + "px");
			this._initResizeArea(30);
		},

		/**
		 * @param {number} minHeight
		 * @private
		 */
		_initResizeArea: function(minHeight) {
			var text ='';
			this._textArea.value.replace(/[<>]/g, '_').split("\n").forEach( function(str) {
				text += '<div>' +  str.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
			} );

			this._hiddenDiv.innerHTML = text;
			var height = Math.max(minHeight, this._hiddenDiv.offsetHeight + 27);

			if (this._textArea.value == "")
			{
				height = minHeight;
				text = "";
			}
			var newFrame = this._frame.clone();
			newFrame.height = height;
			document.dispatchEvent(new CustomEvent("auto-size textarea", {
				detail : {
					frame: newFrame,
					view: this
				}
			}));
		},


		/**
		 * @inheritDoc
		 */
		_init: function() {
			/** @private {!Element} */
			this._container = document.createElement(goog.dom.TagName.DIV);
			this._container.setAttribute("class", "textarea");
			/** @private {!Element} */
			this._textArea = document.createElement(goog.dom.TagName.TEXTAREA);
			this._textArea.setAttribute("class", "noscroll");
			this._container.appendChild(this._textArea);

			/** @private {!Element} */
			this._hiddenDiv = document.createElement(goog.dom.TagName.DIV);
			this._hiddenDiv.setAttribute("class", "hidden");
			this._container.appendChild(this._hiddenDiv);
			
			this._reloadStyleSize();
			this._container.appendChild(this._initBorder());

			goog.events.listen(this._textArea, goog.events.EventType.KEYDOWN, goog.bind(this._initResizeArea, this, 30));

			goog.events.listen(this._textArea, goog.events.EventType.BLUR, goog.bind(function() {
				document.dispatchEvent(new CustomEvent("input text", {
					detail: this
				}));
			}, this));
		}
	});
});