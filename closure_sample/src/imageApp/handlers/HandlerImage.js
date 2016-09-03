goog.provide("imageApp.handlers.HandlerImage");


goog.require("goog.events");
goog.require("goog.events.EventType");

goog.scope(function () {

	/**
	 * @param {imageApp.model.Object} model
	 * @param {imageApp.view.ObjectView} view
	 * @constructor
	 */

	imageApp.handlers.HandlerImage = goog.defineClass(null, {
		/**
		 * @param {imageApp.model.Object} model
		 * @param {imageApp.view.ObjectView} view
		 */
		constructor: function(model, view) {
			this._model = model;
			this._view = view;
			this._addHandlers();
		},

		_addHandlers: function() {
			var imageElem = this._view.getDOMElement();

			goog.events.listen(imageElem.parentElement, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
				if (event.defaultPrevented)
				{
					return false;
				}
				if (this._view.isSelected())
				{
					this._view.setVisibleBorder(false);
				}
			}, this));

			goog.events.listen(imageElem, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
				document.dispatchEvent(new Event("deselectObjects"));

				this._view.setVisibleBorder(true);
				if (event.defaultPrevented || event.which > 1 || !this._view.isSelected())
				{
					return;
				}
				this._startDrag(this._model, this._view, event);
				event.preventDefault();
			}, this));


			var nw = this._view.getNWCorner();
			this._addResizeListener(nw, this._model, this._view, goog.bind(function(frame, shift){
				return this._view.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top - shift.y, frame.width + shift.x, frame.height + shift.y), this._view.getPos());
			}, this));

			var ne =this._view.getNECorner();
			this._addResizeListener(ne, this._model, this._view, goog.bind(function(frame, shift){
				return this._view.getMinFrame(new goog.math.Rect(frame.left, frame.top - shift.y, frame.width - shift.x, frame.height + shift.y), this._view.getPos());
			}, this));

			var sw = this._view.getSWCorner();
			this._addResizeListener(sw, this._model, this._view, goog.bind(function(frame, shift){
				return this._view.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top , frame.width + shift.x, frame.height - shift.y), this._view.getPos());
			}, this));

			var se = this._view.getSECorner();
			this._addResizeListener(se, this._model, this._view, goog.bind(function(frame, shift){
				return this._view.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height - shift.y), this._view.getPos());
			}, this));

			var e = this._view.getECorner();
			this._addResizeListener(e, this._model, this._view, goog.bind(function(frame, shift){
				return this._view.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height), this._view.getPos());
			}, this));

			var w = this._view.getWCorner();
			this._addResizeListener(w, this._model, this._view, goog.bind(function(frame, shift){
				return this._view.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top, frame.width + shift.x, frame.height), this._view.getPos());
			}, this));

			var n = this._view.getNCorner();
			this._addResizeListener(n, this._model, this._view, goog.bind(function(frame, shift){
				return this._view.getMinFrame(new goog.math.Rect(frame.left, frame.top - shift.y, frame.width , frame.height + shift.y), this._view.getPos());
			}, this));

			var s = this._view.getSCorner();
			this._addResizeListener(s, this._model, this._view, goog.bind(function(frame, shift){
				return this._view.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width, frame.height - shift.y), this._view.getPos());
			}, this));
		},


		/**
		 * @param {!Element} corner
		 * @param {imageApp.model.Object} object
		 * @param {imageApp.view.ObjectView} view
		 * @param {function(!goog.math.Rect, !goog.math.Coordinate): !goog.math.Rect} handler
		 * @private
		 */
		_addResizeListener: function(corner, object, view, handler) {
			goog.events.listen(corner, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
				if ( event.defaultPrevented || event.which > 1 || !view.isSelected())
				{
					return;
				}

				var oldFrame = view.getFrame();
				var startPos = new goog.math.Coordinate(event.screenX, event.screenY);

				var keyMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, function(event) {
					var mousePos = new goog.math.Coordinate(event.screenX, event.screenY);
					var shiftMouse = goog.math.Coordinate.difference(startPos, mousePos);

					var newRect = handler(oldFrame, shiftMouse);
					//if (view.isContain(newRect))
					//{
					view.setFrame(newRect);
					//}
				});

				var keyUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, goog.bind(function() {
					var newFrame = view.getFrame();
					if (!goog.math.Rect.equals(newFrame, oldFrame))
					{
						document.dispatchEvent(new CustomEvent("resize", {
							detail: {
								model: object,
								frame: newFrame
							}
						}));
					}
					goog.events.unlistenByKey(keyMove);
					goog.events.unlistenByKey(keyUp);
				}, this));
				event.preventDefault();
			}, this));
		},

		/**
		 * @param {imageApp.model.Object} object
		 * @param {imageApp.view.ObjectView} view
		 * @param {!Event} event
		 * @private
		 */
		_startDrag: function(object, view,  event) {
			if (event.defaultPrevented)
			{
				return;
			}
			var oldPos = object.getFrame().getTopLeft();
			var size = object.getFrame().getSize();

			var shift = goog.math.Coordinate.difference(new goog.math.Coordinate(event.screenX, event.screenY), oldPos);

			var keyMouseMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, function(event) {
				var mousePos = new goog.math.Coordinate(event.screenX, event.screenY);
				var newPos = goog.math.Coordinate.difference(mousePos, shift);
				var newFrame = new goog.math.Rect(newPos.x, newPos.y, size.width, size.height);

				//if (view.isContain(newFrame))
				//{
				view.setFrame(newFrame);
				//}
			});

			var keyMouseUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, goog.bind(function() {
				var newPos = view.getPos();
				if (!goog.math.Coordinate.equals(newPos,oldPos))
				{
					var event = new CustomEvent("move", {
						detail: {
							model: object,
							pos: newPos
						}});
					document.dispatchEvent(event );
				}
				goog.events.unlistenByKey(keyMouseMove);
				goog.events.unlistenByKey(keyMouseUp);
			}, this));

		}
	});

});