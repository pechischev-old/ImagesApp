goog.provide("imageApp.command.MetaCommand");

goog.require("imageApp.command.AbstractAction");

goog.scope(function () {

	/**
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.MetaCommand = goog.defineClass(imageApp.command.AbstractAction, {

		constructor: function() {
			goog.base(this);

			/** @private {Array<imageApp.command.AbstractAction>} */
			this._actions = [];

		},

		/**
		 * @param {imageApp.command.AbstractAction} action
		 */
		appendAction: function (action) {
			this._actions.push(action);
		},

		/**
		 * @return {boolean}
		 */
		isEmpty: function () {
			return this._actions.length == 0;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._actions.forEach(function (action) {
				action._doExecute();

			});
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._actions.forEach(function (action) {
				action._doUnexecute();
			});
		}
	});
});