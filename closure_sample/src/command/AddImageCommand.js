goog.provide("command.AddImageCommand");

goog.require("command.AbstractAction");

goog.scope(function() {

	/**
	 * @param {!function} addImage
	 * @param {!function} deleteImage
 	 * @extends {command.AbstractAction}
	 * @constructor
	 */
	command.AddImageCommand = goog.defineClass(command.AbstractAction, {
		/**
		 * @param {!function} addImage
		 * @param {!function} deleteImage
		 */
		constructor: function (addImage, deleteImage) {
			this.addImage = addImage;
			this.deleteImage = deleteImage;
		},

		/**
		 * @inheritDoc
		 */
		_doExecute: function() {
			console.log('append');
			this.addImage();
		},

		/**
		 * @inheritDoc
	 	 */
		_doUnexecute: function () {
			console.log("delete");
			this.deleteImage();
		}
	});
});