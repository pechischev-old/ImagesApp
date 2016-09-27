goog.provide("imageApp.view.ObjectViewFactory");

goog.require("imageApp.view.TextAreaView");
goog.require("imageApp.view.ImageView");


goog.scope(function() {

	/**
	 * @param {!imageApp.model.Object} object
	 * @return {!imageApp.view.ObjectView}
	 */
	imageApp.view.ObjectViewFactory.createObject = function(object) {
		/** @type {?imageApp.view.ObjectView} */
		var view;
		if (object.getType() == "image")
		{
			var imageObject = /** @type {!imageApp.model.Image} */ (object);
			var image = new imageApp.view.ImageView(imageObject.getFrame(), object, imageObject.getPath());
			view = /** @type {!imageApp.view.ImageView} */ (image);
		}
		else if (object.getType() == "textarea")
		{
			var textAreaObject = /** @type {!imageApp.model.TextArea} */ (object);
			var textArea = new imageApp.view.TextAreaView(textAreaObject.getFrame(), object);

			textArea.setText(textAreaObject.getText());
			view = /** @type {!imageApp.view.TextAreaView} */ (textArea);
		}
		else
		{
			throw new Error("unknown type");
		}
		return view;
	};
});