goog.provide("imageApp.view.ObjectViewFactory");

goog.require("imageApp.view.TextAreaView");
goog.require("imageApp.view.ImageView");
goog.require("imageApp.model.Object");

goog.require("imageApp.handlers.Handler");

goog.scope(function() {

	/**
	 * @param {imageApp.model.Image|imageApp.model.Object} object
	 * @return {imageApp.view.ObjectView}
	 */
	imageApp.view.ObjectViewFactory.createObject = function(object) {
			if (object.getType() == "image")
			{
				var image = new imageApp.view.ImageView(object.getFrame(), object.getPath());
				imageApp.handlers.Handler.addHandlers(object, image, image.getDOMElement());

				return image;
			}
			else if (object.getType() == "textarea")
			{
				var textArea = new imageApp.view.TextAreaView(object.getFrame());

				imageApp.handlers.Handler.addHandlers(object, textArea, textArea.getBorder().getDOMElement(), goog.bind(function () {
					textArea.getDOMElement().getElementsByTagName(goog.dom.TagName.TEXTAREA)[0].focus();
				}, textArea));

				document.addEventListener("auto-size textarea", goog.bind(function(event) {
					/** @type {!goog.math.Rect} */
					var newFrame = event.detail.frame;
					var view = event.detail.view;
					if (!goog.math.Rect.equals(object.getFrame(), newFrame) && view == textArea)
					{
						object.setFrame(newFrame);
					}
				}, object), false);

				return textArea;
			}
			else
			{
				throw new Error("unknown type");
			}
		};
});