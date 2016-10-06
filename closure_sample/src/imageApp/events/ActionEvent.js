goog.provide("imageApp.events.ActionEvent");

goog.require("goog.events.Event");

goog.scope(function () {

	/**
	 * @param {!string} type
	 * @param {imageApp.command.AbstractAction} action
	 * @param {imageApp.view.IObject|imageApp.model.Object} object
	 * @constructor
	 * @extends {goog.events.Event}
	 */
	imageApp.events.ActionEvent = goog.defineClass(goog.events.Event, {
		/**
		 * @param {!string} type
		 * @param {imageApp.command.AbstractAction} action
		 * @param {?imageApp.view.IObject|imageApp.model.Object=} object
		 */
		constructor: function(type, action, object) {
			goog.base(this, type);
			this.action = action;
			this.object = object;
		}
	});
});
