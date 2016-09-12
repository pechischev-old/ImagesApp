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
		 * @inheritDoc
		 */
		_reloadStyleSize: function() {
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
			var textArea = this._container.getElementsByTagName(goog.dom.TagName.TEXTAREA)[0];

			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), textArea);
			goog.style.setStyle(this._hiddenDiv, "width", this._frame.width + "px");
			this._initResizeArea(textArea, this._hiddenDiv, 30);
		},

		/**
		 * @param {!Element} elem
		 * @param {!Element} hiddenDiv
		 * @param {number} minHeight
		 * @private
		 */
		_initResizeArea: function(elem, hiddenDiv, minHeight) {
			var text ='';
			elem.value.replace(/[<>]/g, '_').split("\n").forEach( function(str) {
				text = text + '<div>' +  str.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
			} );

			hiddenDiv.innerHTML = text;
			var height = Math.max(minHeight, hiddenDiv.offsetHeight + 27);

			if (elem.value == "")
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
			
			var textArea = document.createElement(goog.dom.TagName.TEXTAREA);
			textArea.setAttribute("class", "noscroll");
			this._container.appendChild(textArea);

			/** @private {!Element} */
			this._hiddenDiv = document.createElement(goog.dom.TagName.DIV);
			this._hiddenDiv.setAttribute("class", "hidden");
			this._container.appendChild(this._hiddenDiv);
			
			this._reloadStyleSize();
			this._container.appendChild(this._initBorder());

			goog.events.listen(textArea, goog.events.EventType.KEYDOWN, goog.bind(this._initResizeArea, this, textArea, this._hiddenDiv, 30));
		}
	});
});