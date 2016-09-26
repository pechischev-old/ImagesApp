goog.provide("imageApp.handlers.Handler");


goog.require("goog.events");
goog.require("goog.events.EventType");
goog.require("imageApp.events.EventType");


goog.scope(function () {

	/**
	 * @constructor
	 */
	imageApp.handlers.Handler = goog.defineClass(null, {
		constructor: function () {
			
		},

		/**
		 * @param {!Element} elem
		 * @param {!imageApp.view.ObjectView} view
		 * @param {function(!goog.math.Coordinate)} callback
		 */
		addMoveListener: function(elem, view, callback) {

			goog.events.listen(elem, goog.events.EventType.MOUSEDOWN, function (event) {
				//document.dispatchEvent(new Event(imageApp.events.EventType.DESELECT_OBJECT));
				view.dispatchEvent(new Event(imageApp.events.EventType.DESELECT_OBJECT));

				view.setVisibleBorder(true);
				if (event.defaultPrevented || event.which > 1 || !view.isSelected()) {
					return;
				}

				var oldPos = view.getFrame().getTopLeft();
				var size = view.getFrame().getSize();

				var shift = goog.math.Coordinate.difference(new goog.math.Coordinate(event.screenX, event.screenY), oldPos);

				var keyMouseMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, function (event) {
					var newPos = goog.math.Coordinate.difference(new goog.math.Coordinate(event.screenX, event.screenY), shift);
					view.setFrame(new goog.math.Rect(newPos.x, newPos.y, size.width, size.height));

				});

				var keyMouseUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, function () {
					var newPos = view.getPos();
					if (!goog.math.Coordinate.equals(newPos, oldPos)) {
						callback(newPos);
					}
					goog.events.unlistenByKey(keyMouseMove);
					goog.events.unlistenByKey(keyMouseUp);
				});

				event.preventDefault();

			})
		},

		/**
		 * @param {!Element} corner
		 * @param {imageApp.view.IObject} view
		 * @param {function(!goog.math.Rect, !goog.math.Coordinate): !goog.math.Rect} handler
		 * @param {function(!goog.math.Rect)} callback
		 */
		addResizeListener: function(corner, view, handler, callback) {
			goog.events.listen(corner, goog.events.EventType.MOUSEDOWN, function(event) {
				if ( event.defaultPrevented || event.which > 1 || !view.isSelected())
				{
					return;
				}
				var oldFrame = view.getFrame();
				var startPos = new goog.math.Coordinate(event.screenX, event.screenY);

				var keyMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, function(event) {
					var newRect = handler(oldFrame, goog.math.Coordinate.difference(startPos, new goog.math.Coordinate(event.screenX, event.screenY)));
					view.setFrame(newRect);
				});

				var keyUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, function() {
					var newFrame = view.getFrame();
					if (!goog.math.Rect.equals(newFrame, oldFrame))
					{
						callback(newFrame);
					}
					goog.events.unlistenByKey(keyMove);
					goog.events.unlistenByKey(keyUp);
				});
				event.preventDefault();
			});
		}
	});
});