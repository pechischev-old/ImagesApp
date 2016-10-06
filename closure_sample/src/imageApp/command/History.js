goog.provide("imageApp.command.History");


goog.require("imageApp.command.IHistory");
goog.require("imageApp.command.AbstractAction");

goog.scope(function() {

	/**
	 * @implements {imageApp.command.IHistory}
	 * @implements {imageApp.command.IHistoryViewDelegate}
	 * @constructor
	 */
	imageApp.command.History = goog.defineClass(null, {
		constructor: function() {
			/** @private {Array<imageApp.command.AbstractAction>}*/
			this._actions = [];
			/** @private {!number} */
			this._currentActionIndex = 0;
		},

		/**
		 * @param {imageApp.command.AbstractAction} action
		 */
		recordExecuteAction: function (action) {
			this._appendAction(action);
		},

		/**
		 * @param {imageApp.command.AbstractAction} action
		 */
		executeAndRecordAction: function(action) {
			action.execute();
			this._appendAction(action);
		},

		/**
		 * @param {imageApp.command.AbstractAction} action
		 */
		_appendAction: function (action) {
			if (this._currentActionIndex < this._actions.length)
			{
				this._cleaningActionsfromCurrentIndex();
			}
			this._actions.push(action);
			++this._currentActionIndex;
		},


		undo: function() {
			if (this._actions.length == 0)
			{
				console.log("Command stack is empty");
			}
			else if (this._currentActionIndex > 0)
			{
				--this._currentActionIndex;
				this._actions[this._currentActionIndex].unexecute();
			}
		},


		redo: function() {
			if (this._actions.length == 0)
			{
				 console.log("Command stack is empty");
			}
			else if (this._currentActionIndex == this._actions.length)
			{
				 console.log("Command stack is full");
			}
			else if (this._currentActionIndex <= this._actions.length)
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