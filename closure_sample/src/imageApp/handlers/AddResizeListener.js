goog.provide("imageApp.handlers.AddResizeListener");

goog.require("imageApp.view.IObject");
goog.require("goog.events");
goog.require("goog.events.EventType");

goog.scope(function () {

	/**
	 * @param {!Element} corner
	 * @param {imageApp.view.IObject} view
	 * @param {function(!goog.math.Rect, !goog.math.Coordinate): !goog.math.Rect} handler
	 * @param {function(!goog.math.Rect)} callback
	 * @private
	 */
	imageApp.handlers.AddResizeListener = function(corner, view, handler, callback) {
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
	};
});