goog.provide("command.AbstractAction");


goog.require("command.IAction");

goog.scope(function() {

	/**
	 * @implements {command.IAction}
	 * @constructor
	 */
	command.AbstractAction = goog.defineClass(null, {
		constructor: function() {

		},

		execute: function() {
			this.doExecute();
		},

		unexecute: function() {
			this.doUnexecute();
		},

		doExecute: function () {},

		doUnexecute: function () {}

	})
});