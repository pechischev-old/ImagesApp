goog.provide("imageApp.view.ObjectViewFactory");

goog.require("imageApp.view.TextAreaView");
goog.require("imageApp.view.ImageView");

goog.require("imageApp.Constants");


goog.scope(function() {
	var Constants = imageApp.Constants;
	/**
	 * @param {!imageApp.model.Object} object
	 * @return {!imageApp.view.ObjectView}
	 */
	imageApp.view.ObjectViewFactory.createObject = function(object) {

		if (object.getType() == Constants.IMAGE)
		{
			var imageObject = /** @type {!imageApp.model.Image} */ (object);
			return new imageApp.view.ImageView(imageObject.getFrame(), object, imageObject.getPath());
		}
		else if (object.getType() == Constants.TEXTAREA)
		{
			var textAreaObject = /** @type {!imageApp.model.TextArea} */ (object);
			return new imageApp.view.TextAreaView(textAreaObject.getFrame(), object, textAreaObject.getText());
		}
		else
		{
			throw new Error("unknown type");
		}
	};
});