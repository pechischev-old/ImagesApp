goog.provide("command.History");


goog.require("command.IHistory");
goog.require("command.IAction");

goog.scope(function() {

	/**
	 * @implements {command.IHistory}
	 * @implements {command.IHistoryViewDelegate}
	 * @constructor
	 */
	command.History = goog.defineClass(null, {
		constructor: function() {
			/** @private {Array<command.IAction>}*/
			this._actions = [];
			/** @private {!number} */
			this._currentActionIndex = -1;
		},

		/**
		 * @param {command.IAction} action
		 */
		recordAction: function(action) {

			if (this._currentActionIndex < this._actions.length - 1)
			{
				this._cleaningActionsfromCurrentIndex();
				this._actions[this._currentActionIndex] = action;
			}
			else
			{
				this._actions.push(action);
				++this._currentActionIndex;
			}
			action.execute();
		},


		undo: function() {
			if (this._actions.length == 0)
			{
				throw new Error("Command stack is empty");
			}
			else if (this._currentActionIndex > 0)
			{
				this._actions[this._currentActionIndex].unexecute();
				--this._currentActionIndex;
			}


		},


		redo: function() {
			if (this._actions.length == 0)
			{
				throw new Error("Command stack is empty");
			}
			else if (this._currentActionIndex == this._actions.length - 1)
			{
				throw new Error("Command stack is full");
			}
			else {
				this._actions[this._currentActionIndex].execute();
				++this._currentActionIndex;
			}
			
		},

		/**
		 * @private
		 */
		_cleaningActionsfromCurrentIndex: function() {
			this._actions = this._actions.slice(0, this._currentActionIndex + 1);
		}
	});
});