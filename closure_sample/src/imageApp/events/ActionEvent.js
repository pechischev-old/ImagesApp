goog.provide("imageApp.events.ActionEvent");

goog.require("goog.events.Event");

goog.scope(function () {

	/**
	 * @param {!string} type
	 * @param {imageApp.command.AbstractAction} action
	 * @constructor
	 * @extends {goog.events.Event}
	 */
	imageApp.events.ActionEvent = goog.defineClass(goog.events.Event, {
		/**
		 * @param {!string} type
		 * @param {imageApp.command.AbstractAction} action
		 */
		constructor: function(type, action) {
			goog.base(this, type);
			this.action = action;
		}
	});
});
