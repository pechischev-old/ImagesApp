goog.provide("command.AddImageCommand");

goog.require("command.AbstractAction");

goog.scope(function() {

	/**
	 * @param {model.ImagesModel} model
	 * @param {view.ImagesView} view
 	 * @extends {command.AbstractAction}
	 * @constructor
	 */
	command.AddImageCommand = goog.defineClass(command.AbstractAction, {
		/**
		 * @param {model.ImagesModel} model
		 * @param {view.ImagesView} view
		 */
		constructor: function (model, view) {
			this._model = model;
			this._view = view;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			
		},

		/**
		 * @inheritDoc
	 	 */
		_doUnexecute: function () {

		}
	});
});