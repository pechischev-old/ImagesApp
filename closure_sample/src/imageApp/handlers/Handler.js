goog.provide("imageApp.handlers.Handler");


goog.require("goog.events");
goog.require("goog.events.EventType");


goog.scope(function () {

	/**
	 * @param {imageApp.model.Object} model
	 * @param {imageApp.view.ObjectView} view
	 * @param {!Element} elem
	 * @param {?function(*)=} action
	 */
	imageApp.handlers.Handler.addHandlers = function(model, view, elem, action) {

		goog.events.listen(elem, goog.events.EventType.MOUSEDOWN, function(event) {
			document.dispatchEvent(new Event("deselectObjects"));

			view.setVisibleBorder(true);
			if (event.defaultPrevented || event.which > 1 || !view.isSelected())
			{
				return;
			}
			if (action)
			{
				action();
			}
			imageApp.handlers.Handler._startDrag(model, view, event);


			var nw = view.getNWCorner();
			imageApp.handlers.Handler._addResizeListener(nw, model, view, function(frame, shift){
				return view.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top - shift.y, frame.width + shift.x, frame.height + shift.y), view.getPos());
			});

			var ne = view.getNECorner();
			imageApp.handlers.Handler._addResizeListener(ne, model, view, function(frame, shift){
				return view.getMinFrame(new goog.math.Rect(frame.left, frame.top - shift.y, frame.width - shift.x, frame.height + shift.y), view.getPos());
			});

			var sw = view.getSWCorner();
			imageApp.handlers.Handler._addResizeListener(sw, model, view, function(frame, shift){
				return view.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top , frame.width + shift.x, frame.height - shift.y), view.getPos());
			});

			var se = view.getSECorner();
			imageApp.handlers.Handler._addResizeListener(se, model, view, function(frame, shift){
				return view.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height - shift.y), view.getPos());
			});

			var e = view.getECorner();
			imageApp.handlers.Handler._addResizeListener(e, model, view, function(frame, shift){
				return view.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height), view.getPos());
			});

			var w = view.getWCorner();
			imageApp.handlers.Handler._addResizeListener(w, model, view, function(frame, shift){
				return view.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top, frame.width + shift.x, frame.height), view.getPos());
			});

			var n = view.getNCorner();
			imageApp.handlers.Handler._addResizeListener(n, model, view, function(frame, shift){
				return view.getMinFrame(new goog.math.Rect(frame.left, frame.top - shift.y, frame.width , frame.height + shift.y), view.getPos());
			});

			var s = view.getSCorner();
			imageApp.handlers.Handler._addResizeListener(s, model, view, function(frame, shift){
				return view.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width, frame.height - shift.y), view.getPos());
			});

			event.preventDefault();

		});
	};

	/**
	 * @param {imageApp.model.Object} object
	 * @param {imageApp.view.ObjectView} view
	 * @param {!Event} event
	 * @private
	 */
	imageApp.handlers.Handler._startDrag = function (object, view, event) {
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

			view.setFrame(newFrame);

		});

		var keyMouseUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, function() {
			var newPos = view.getPos();
			if (!goog.math.Coordinate.equals(newPos, oldPos))
			{
				var event = new CustomEvent("move", {
					detail: {
						model: object,
						pos: newPos
					}});
				document.dispatchEvent(event);
			}
			goog.events.unlistenByKey(keyMouseMove);
			goog.events.unlistenByKey(keyMouseUp);
		});
	};

	/**
	 * @param {!Element} corner
	 * @param {imageApp.model.Object} object
	 * @param {imageApp.view.ObjectView} view
	 * @param {function(!goog.math.Rect, !goog.math.Coordinate): !goog.math.Rect} handler
	 * @private
	 */
	imageApp.handlers.Handler._addResizeListener = function(corner, object, view, handler) {
		goog.events.listen(corner, goog.events.EventType.MOUSEDOWN, function(event) {
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

			var keyUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, function() {
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
			});
			event.preventDefault();
		});
	};
});