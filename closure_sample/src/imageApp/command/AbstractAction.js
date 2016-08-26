goog.provide("imageApp.command.AbstractAction");


goog.require("imageApp.command.IAction");

goog.scope(function() {

	/**
	 * @implements {imageApp.command.IAction}
	 * @constructor
	 */
	imageApp.command.AbstractAction = goog.defineClass(null, {
		constructor: function() {

		},

		execute: function() {
			this._doExecute();
		},

		unexecute: function() {
			this._doUnexecute();
		},

		/**
		 * @protected
		 */
		_doExecute: function () {},

		/**
		 * @protected
		 */
		_doUnexecute: function () {}

	})
});