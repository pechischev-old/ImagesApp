goog.provide("imageApp.handlers.Listener");

goog.require("goog.events");
goog.require("goog.events.EventType");


goog.scope(function () {


	/**
	 * @param {!function(...)} handler
	 * @param {function(...)=}callback
	 */
	imageApp.handlers.Listener.addMouseMoveListener = function (handler, callback) {
		var keyMouseMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, handler);
		var keyMouseUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, function () {
			if (callback)
			{
				callback();
			}
			goog.events.unlistenByKey(keyMouseMove);
			goog.events.unlistenByKey(keyMouseUp);
		});
	};
	
});