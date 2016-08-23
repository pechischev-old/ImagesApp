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