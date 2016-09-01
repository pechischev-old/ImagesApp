goog.provide("imageApp.view.ObjectViewFactory");

goog.require("imageApp.view.TextAreaView");
goog.require("imageApp.view.ImageView");
goog.require("imageApp.model.Object");

goog.scope(function() {

	/**
	 * @param {imageApp.model.Image|imageApp.model.Object} object
	 * @return {imageApp.view.ObjectView}
	 */
	imageApp.view.ObjectViewFactory.createObject = function(object) {
			if (object.getType() == "image") 
			{
				return new imageApp.view.ImageView(object.getFrame(), object.getPath());
			}
			else if (object.getType() == "textarea") 
			{
				return new imageApp.view.TextAreaView(object.getFrame());
			}
		};
});