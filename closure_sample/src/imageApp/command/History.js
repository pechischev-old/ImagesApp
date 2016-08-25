goog.provide("imageApp.command.History");


goog.require("imageApp.command.IHistory");
goog.require("imageApp.command.IAction");

goog.scope(function() {

	/**
	 * @implements {imageApp.command.IHistory}
	 * @implements {imageApp.command.IHistoryViewDelegate}
	 * @constructor
	 */
	imageApp.command.History = goog.defineClass(null, {
		constructor: function() {
			/** @private {Array<imageApp.command.IAction>}*/
			this._actions = [];
			/** @private {!number} */
			this._currentActionIndex = 0;
		},

		/**
		 * @param {imageApp.command.IAction} action
		 */
		recordAction: function(action) {
			if (this._currentActionIndex < this._actions.length)
			{
				this._cleaningActionsfromCurrentIndex();
			}
			this._actions.push(action);
			++this._currentActionIndex;
			action.execute();

		},


		undo: function() {
			if (this._actions.length == 0)
			{
				throw new Error("Command stack is empty");
			}
			if (this._currentActionIndex > 0)
			{
				--this._currentActionIndex;
				this._actions[this._currentActionIndex].unexecute();
			}
		},


		redo: function() {
			if (this._actions.length == 0)
			{
				throw new Error("Command stack is empty");
			}
			if (this._currentActionIndex == this._actions.length)
			{
				throw new Error("Command stack is full");
			}
			if (this._currentActionIndex <= this._actions.length)
			{
				this._actions[this._currentActionIndex].execute();
				++this._currentActionIndex;
			}
		},

		/**
		 * @private
		 */
		_cleaningActionsfromCurrentIndex: function() {
			this._actions = this._actions.slice(0, this._currentActionIndex);
		}
	});
});