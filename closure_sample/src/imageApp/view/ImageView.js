goog.provide("imageApp.view.ImageView");


goog.require("imageApp.view.ObjectView");

goog.scope(function() {
	
	/**
	 * @param {!goog.math.Rect} frame
	 * @param {!imageApp.model.Object} object
	 * @param {string} path
	 * @extends {imageApp.view.ObjectView}
	 * @constructor
	 */
	imageApp.view.ImageView = goog.defineClass(imageApp.view.ObjectView, {
		/**
		 * @param {!goog.math.Rect} frame
		 * @param {!imageApp.model.Object} object
		 * @param {string} path
		 */
		constructor: function(frame, object, path) {
			goog.base(this, frame, object);
			/** @private {string} */
			this._path = path;
			this._init();
			this.addListener();
		},
		

		/**
		 * @inheritDoc 
		 */
		getDOMElement: function(){
			return this._object;
		},

		/** 
		 * @inheritDoc 
		 */
		_reloadStyleSize: function() {
			var image = this._container.getElementsByTagName(goog.dom.TagName.IMG)[0];
			this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
			this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
		},
		

		/**
		 * @inheritDoc
		 */
		_init: function() {
			/** @private {!Element} */
			this._object = document.createElement(goog.dom.TagName.DIV);
			this._object.setAttribute("class", "container");
			/** @private {!Element} */
			this._container = document.createElement(goog.dom.TagName.DIV);
			this._container.setAttribute("class", "capture");
			var image = document.createElement(goog.dom.TagName.IMG);
			image.setAttribute("src", this._path);
			image.setAttribute("alt", "текст");
			this._container.appendChild(image);
			this._object.appendChild(this._container);
			this._reloadStyleSize();
			this._object.appendChild(this._initBorder());
		},

		_appendMoveListener: function (event) {
			if (event.defaultPrevented) return;

			var oldFrame = this._frame;
			var startPos =  new goog.math.Coordinate(event.screenX, event.screenY);

			var calculateFrame = goog.bind(function(event) {
				var shift = goog.math.Coordinate.difference(startPos, new goog.math.Coordinate(event.screenX, event.screenY));
				var newFrame = new goog.math.Rect(oldFrame.left - shift.x, oldFrame.top - shift.y, oldFrame.width, oldFrame.height);
				this.setFrame(newFrame);
			}, this);

			var callback = goog.bind(function() {
				var newPos = this.getFrame().getTopLeft();
				if (!goog.math.Coordinate.equals(newPos, oldFrame.getTopLeft()))
				{
					this.dispatchEvent(new CustomEvent(imageApp.events.EventType.MOVE_OBJECT, {
						detail : {
							pos: newPos,
							model: this._model
						}
					}));
				}
			}, this);

			imageApp.handlers.Listener.addMouseMoveListener(calculateFrame, callback);
		},

		/**
		 * @inheritDoc
		 */
		_appendHandlers: function(event) {
			this._border.addResizeListeners(event);
			this._border.addMoveListeners(event, this);
			this._appendMoveListener(event);
			event.preventDefault();
		}
	});
});