goog.provide("imageApp.view.TextAreaView");

goog.require("goog.dom");
goog.require("imageApp.view.ObjectView");

goog.scope(function() {

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

			return frame;
		},

		/**
		 * @inheritDoc
		 */
		_reloadStyleSize: function() {
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
			var image = this._container.getElementsByTagName(goog.dom.TagName.TEXTAREA)[0];
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);

			goog.style.setStyle(this._hiddenDiv, "width", this._frame.width + "px");
		},

		/**
		 * @param {!Element} elem
		 * @param {!Element} hiddenDiv
		 * @param {number} minHeight
		 * @private
		 */
		_initResizeArea: function(elem, hiddenDiv, minHeight) {
			var text ='';
			elem.value.replace(/[<>]/g, '_').split("\n").forEach( function(str, index) {
				console.log(str.length + " = " + text.length + " ind " + index);
				text = text +  str.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
			} );

			hiddenDiv.innerHTML = text;
			var height = Math.max(minHeight, hiddenDiv.offsetHeight + 27);

			if (elem.value == "")
			{
				height = minHeight;
				text = "";
			}
			this._frame.height = height;
			var event = new CustomEvent("auto-size textarea", {
				detail : this._frame
			});
			document.dispatchEvent(event);
			this.setFrame(this._frame);
		},


		/**
		 * @inheritDoc
		 */
		_init: function() {

			/** @private {!Element} */
			this._container = document.createElement(goog.dom.TagName.DIV);
			this._container.setAttribute("class", "textarea");

			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
			var image = document.createElement(goog.dom.TagName.TEXTAREA);
			image.setAttribute("class", "noscroll");
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
			this._container.appendChild(image);

			/** @private {!Element} */
			this._hiddenDiv = document.createElement(goog.dom.TagName.DIV);
			this._hiddenDiv.setAttribute("class", "hidden");

			goog.style.setStyle(this._hiddenDiv, "width", this._frame.width + "px");
			this._container.appendChild(this._hiddenDiv);

			this._container.appendChild(this._initBorder());

			goog.events.listen(image, goog.events.EventType.KEYDOWN, goog.bind(this._initResizeArea, this, image, this._hiddenDiv, 30));
		}
	});
});