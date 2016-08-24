goog.provide("ImageController");

goog.require("command.History");
goog.require("command.MoveCommand");
goog.require("command.AddImageCommand");
goog.require("command.DeleteCommand");
goog.require("command.ResizeCommand");

goog.require("goog.events");
goog.require("goog.events.EventType");

goog.scope(function () {
	var MoveCommand = command.MoveCommand;
	var AddImageCommand = command.AddImageCommand;
	var DeleteCommand = command.DeleteCommand;
	var ResizeCommand = command.ResizeCommand;

	/**
	 * @param {model.ImagesModel} imagesModel
	 * @param {view.ImagesView} imagesView
	 * @constructor
	 */
	ImageController = goog.defineClass(null, {
		/**
 		 * @param {model.ImagesModel} imagesModel
 		 * @param {view.ImagesView}imagesView
		 */
		constructor: function (imagesModel, imagesView) {
			/** @private {model.ImagesModel} */
			this._imagesModel = imagesModel;
			/** @private {view.ImagesView} */
			this._imagesView = imagesView;

			/** @private {command.History} */
			this._history = new command.History();
		},

		undo: function () {
			this._history.undo();
		},

		redo: function () {
			
			this._history.redo();
		},

		/**
		 * @param {string} path
		 * @param {!Element} canvas
		 */
		addImage: function(path, canvas) {

			var img = new Image(0, 0);
			img.src = path;
			img.onload = goog.bind(function(){
				var imageModel = this._imagesModel.addImage(new goog.math.Size(img.naturalWidth, img.naturalHeight));
				var imageView = this._imagesView.addImage(imageModel.getFrame(), path);
				imageModel.registerObserver(imageView);
				var imageElem = imageView.getDOMElement();
				canvas.appendChild(imageElem);
				
				goog.events.listen(imageElem.parentElement, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
					if (event.defaultPrevented)
					{
						return;
					}
					else if (imageView.isSelected())
					{
						imageView.setVisibleBorder(false);
					}
				}, this));

				imageElem.onmousedown = goog.bind(function(event) {

					this._imagesView.deselectOtherImages();

					imageView.setVisibleBorder(true);
					if (event.defaultPrevented)
					{
						return;
					}
					else if (event.which > 1) {
						return;
					}
					if (imageView.isSelected() )
					{
						this._startDrag(imageModel, imageView, event);
					}
					event.preventDefault();
				}, this);

			}, this);
		},


		/**
		 * @param {model.Image} model
		 * @param {view.ImageView} view
		 * @param {!Event} event
		 * @private
		 */
		_startDrag: function(model, view,  event) {
			var oldPos = model.getFrame().getTopLeft();
			var size = model.getFrame().getSize();
			var elem = view.getDOMElement();

			var shift = goog.math.Coordinate.difference(new goog.math.Coordinate(event.pageX, event.pageY), oldPos);

			var keyMouseMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, goog.bind(function(event) {
				var mousePos = new goog.math.Coordinate(event.clientX, event.clientY);
				var newPos = goog.math.Coordinate.difference(mousePos, shift);
				view.setFrame(new goog.math.Rect(newPos.x, newPos.y, size.width, size.height));
			}, this));

			var keyMouseUp = goog.events.listen(elem, goog.events.EventType.MOUSEUP, goog.bind(function() {
				var newPos = view.getPos();
				if (!goog.math.Coordinate.equals(newPos,oldPos))
				{
					var command = new MoveCommand(model, newPos);
					this._history.recordAction(command);
				}
				goog.events.unlistenByKey(keyMouseMove);
				goog.events.unlistenByKey(keyMouseUp);
			}, this));

		},

		/**
		 * @param {!Element} canvas
		 */
		deleteImage: function(canvas) {
			var index = this._imagesView.getIndexSelectingImage();
			if (String(index))
			{
				var command = new DeleteCommand(this._imagesModel, this._imagesView, index);
				this._history.recordAction(command);
			}
		}

	});
});