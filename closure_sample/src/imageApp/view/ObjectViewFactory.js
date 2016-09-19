goog.provide("imageApp.view.ObjectViewFactory");

goog.require("imageApp.view.TextAreaView");
goog.require("imageApp.view.ImageView");

goog.require("imageApp.handlers.AddMoveListener");

goog.scope(function() {

	/**
	 * @param {!imageApp.model.Object} object
	 * @return {imageApp.view.ObjectView}
	 */
	imageApp.view.ObjectViewFactory.createObject = function(object) {
			if (object.getType() == "image")
			{
				var imageObject = /** @type {!imageApp.model.Image} */ (object);
				var image = new imageApp.view.ImageView(imageObject.getFrame(), imageObject.getPath());


				imageApp.handlers.AddMoveListener(image.getDOMElement(), image, function(newPos) {
					document.dispatchEvent(new CustomEvent(imageApp.events.EventType.MOVE_OBJECT, {
						detail: {
							model: imageObject,
							pos: newPos
						}
					}));
				});
				return image;
			}
			else if (object.getType() == "textarea")
			{
				var textAreaObject = /** @type {!imageApp.model.TextArea} */ (object);
				var textArea = new imageApp.view.TextAreaView(textAreaObject.getFrame());
				textArea.getBorder().addListener(function(newFrame) {
					document.dispatchEvent(new CustomEvent(imageApp.events.EventType.RESIZE_OBJECT, {
						detail: {
							model: textAreaObject,
							frame: newFrame
						}
					}));
				});

				goog.events.listen(textArea.getDOMElement(), goog.events.EventType.MOUSEDOWN, function (event) {
					document.dispatchEvent(new Event(imageApp.events.EventType.DESELECT_OBJECT));
					textArea.setVisibleBorder(true);
					event.preventDefault();
				});

				document.addEventListener(imageApp.events.EventType.AUTOSIZE_TEXTAREA, goog.bind(function(event) {
					/** @type {number} */
					var height = event.detail.height;
					var newFrame = object.getFrame().clone();
					newFrame.height = height;
					var view = event.detail.view;
					if (!goog.math.Rect.equals(object.getFrame(), newFrame) && view == textArea)
					{
						object.setFrame(newFrame);
					}
				}, object), false);
				textArea.setText(object.getText());
				return textArea;
			}
			else
			{
				throw new Error("unknown type");
			}
		};
});