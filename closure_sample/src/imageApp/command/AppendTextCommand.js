goog.provide("imageApp.command.AppendTextCommand");

goog.require("imageApp.command.AbstractAction");


goog.scope(function () {

	/**
	 * @param {imageApp.model.TextArea} object
	 * @param {string} newText
	 * @param {string} oldText
	 * @extends {imageApp.command.AbstractAction}
	 * @constructor
	 */
	imageApp.command.AppendTextCommand = goog.defineClass(imageApp.command.AbstractAction, {
		/**
		 * @param {imageApp.model.TextArea} object
		 * @param {string} newText
		 * @param {string} oldText
		 */
		constructor: function(object, newText, oldText) {
			goog.base(this);
			/** @private {imageApp.model.TextArea} */
			this._object = object;

			/** @private {string} */
			this._oldText = oldText;

			/** @private {string} */
			this._newText = newText;

		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			this._object.setText(this._newText);
		},

		/**
		 * @inheritDoc
		 */
		_doUnexecute: function () {
			this._object.setText(this._oldText);
		}
	});
});