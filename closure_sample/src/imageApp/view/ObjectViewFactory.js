goog.provide("imageApp.view.ObjectViewFactory");

goog.require("imageApp.view.TextAreaView");
goog.require("imageApp.view.ImageView");

goog.require("imageApp.handlers.AddMoveListener");

goog.scope(function() {

	/**
	 * @param {!imageApp.model.Object} object
	 * @return {!imageApp.view.ObjectView}
	 */
	imageApp.view.ObjectViewFactory.createObject = function(object) {
		/** @type {!imageApp.view.ObjectView} */
		var view;
		/**  @type {?imageApp.view.IObject} */
		var movableObject = undefined;
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
			movableObject = image;


			view = /** @type {!imageApp.view.ImageView} */ (image);
		}
		else if (object.getType() == "textarea")
		{
			var textAreaObject = /** @type {!imageApp.model.TextArea} */ (object);
			var textArea = new imageApp.view.TextAreaView(textAreaObject.getFrame());

			goog.events.listen(textArea.getDOMElement(), goog.events.EventType.MOUSEDOWN, function (event) {
				document.dispatchEvent(new Event(imageApp.events.EventType.DESELECT_OBJECT));
				textArea.setVisibleBorder(true);
				textArea.getDOMElement().getElementsByTagName(goog.dom.TagName.TEXTAREA)[0].focus();
				//textArea.getDOMElement().getElementsByTagName(goog.dom.TagName.TEXTAREA)[0].select();
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
			view = /** @type {!imageApp.view.TextAreaView} */ (textArea);
		}
		else
		{
			throw new Error("unknown type");
		}

		view.getBorder().addListener(function(newFrame) {
			document.dispatchEvent(new CustomEvent(imageApp.events.EventType.RESIZE_OBJECT, {
				detail: {
					model: object,
					frame: newFrame
				}
			}));
		}, movableObject);
		return view;
	};
});