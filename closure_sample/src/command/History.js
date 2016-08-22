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
			this._currentActionIndex = 0;
		},

		/**
		 * @param {command.IAction} action
		 */
		recordAction: function(action) {

			if (this._currentActionIndex < this._actions.length)
			{
				this._cleaningActionsfromCurrentIndex();
				this._actions[this._currentActionIndex + 1] = action;
			}
			else
			{
				this._actions.push(action);
			}
			action.execute();
			++this._currentActionIndex;
			console.log(this._actions.length + " " + this._currentActionIndex );
		},


		undo: function() {
			if (this._actions.length == 0)
			{
				throw new Error("Command stack is empty");
			}
			this._actions[--this._currentActionIndex].unexecute();

		},


		redo: function() {
			if (this._actions.length == 0)
			{
				throw new Error("Command stack is empty");
			}
			else if (this._currentActionIndex >= this._actions.length  )
			{
				throw new Error("out of range");
			}
			this._actions[++this._currentActionIndex].execute();
			//++this._currentActionIndex;
		},

		/**
		 * @private
		 */
		_cleaningActionsfromCurrentIndex: function() {
			for (var i = this._actions.length - 1; i == this._currentActionIndex; --i)
			{
				this._actions.pop();
			}
		}
	});
});