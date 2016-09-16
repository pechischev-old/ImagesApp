goog.provide("imageApp.events.EventType");


goog.scope(function () {

	/**
	 * @enum {string}
	 */
	imageApp.events.EventType = {
		APPEND_OBJECT: "append object",
		APPEND_MEDIA: "append media",
		APPEND_TEXT: "append text",
		AUTOSIZE_TEXTAREA: "auto-size textarea",
		TEXT_CHANGED: "text changed",
		DESELECT_OBJECT: "deselect object",
		INPUT_TEXT: "input text",
		LAYOUT_CHANGED: "layout changed",
		MOVE_OBJECT: "move object",
		OBJECT_CHANGED: "object changed",
		REMOVE_OBJECT: "remove object",
		RESIZE_OBJECT: "resize object",
		OBJECT_TRANSFORMED: "object transformed",
		CHANGE_TYPE_LAYOUT: "change the type of layout"
	};
});