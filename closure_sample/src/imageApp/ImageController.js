goog.provide("imageApp.ImageController");

goog.require("imageApp.command.MoveCommand");
goog.require("imageApp.command.AddImageCommand");
goog.require("imageApp.command.DeleteCommand");
goog.require("imageApp.command.ResizeCommand");

goog.require("goog.events");
goog.require("goog.events.EventType");

goog.scope(function () {
	var MoveCommand = imageApp.command.MoveCommand;
	var AddImageCommand = imageApp.command.AddImageCommand;
	var DeleteCommand = imageApp.command.DeleteCommand;
	var ResizeCommand = imageApp.command.ResizeCommand;

	/**
	 * @param {imageApp.model.ImagesModel} imagesModel
	 * @param {imageApp.view.ImagesView} imagesView
	 * @param {imageApp.command.History} history
	 * @constructor
	 */
	imageApp.ImageController = goog.defineClass(null, {
		/**
 		 * @param {imageApp.model.ImagesModel} imagesModel
 		 * @param {imageApp.view.ImagesView}imagesView
		 * @param {imageApp.command.History} history
		 */
		constructor: function (imagesModel, imagesView, history) {
			/** @private {imageApp.model.ImagesModel} */
			this._imagesModel = imagesModel;
			/** @private {imageApp.view.ImagesView} */
			this._imagesView = imagesView;

			/** @private {imageApp.command.History} */
			this._history = history;
		},

		/**
		 * @param {string} path
		 */
		addImage: function(path) {
			var img = new Image(0, 0);
			img.src = path;
			img.onload = goog.bind(this._onLoadImage, this, new goog.math.Size(img.naturalWidth, img.naturalHeight), path);
		},

		/**
		 * @param {!goog.math.Size} size
		 * @param {string} path
		 * @private
		 */
		_onLoadImage: function(size, path) {
			var imageModel = this._imagesModel.createImage(size);
			var imageView = new imageApp.view.ImageView(imageModel.getFrame(), path);
			imageModel.registerObserver(imageView);

			var imageElem = imageView.getDOMElement();
			var command = new AddImageCommand(this._imagesModel, this._imagesView, imageModel, imageView);

			this._history.recordAction(command);
			goog.events.listen(imageElem.parentElement, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
				if (event.defaultPrevented)
				{
					return false;
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

			var nw = imageView.getNWCorner();
			this._addResizeListener(nw, imageModel, imageView, function(frame, shift){
				return new goog.math.Rect(frame.left - shift.x, frame.top - shift.y, frame.width + shift.x, frame.height + shift.y);
			});

			var ne = imageView.getNECorner();
			this._addResizeListener(ne, imageModel, imageView, function(frame, shift){
				return new goog.math.Rect(frame.left, frame.top - shift.y, frame.width - shift.x, frame.height + shift.y);
			});

			var sw = imageView.getSWCorner();
			this._addResizeListener(sw, imageModel, imageView, function(frame, shift){
				return new goog.math.Rect(frame.left - shift.x, frame.top , frame.width + shift.x, frame.height - shift.y);
			});

			var se = imageView.getSECorner();
			this._addResizeListener(se, imageModel, imageView, function(frame, shift){
				return new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height - shift.y);
			});

			var e = imageView.getECorner();
			this._addResizeListener(e, imageModel, imageView, function(frame, shift){
				return new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height);
			});

			var w = imageView.getWCorner();
			this._addResizeListener(w, imageModel, imageView, function(frame, shift){
				return new goog.math.Rect(frame.left - shift.x, frame.top, frame.width + shift.x, frame.height);
			});

			var n = imageView.getNCorner();
			this._addResizeListener(n, imageModel, imageView, function(frame, shift){
				return new goog.math.Rect(frame.left, frame.top - shift.y, frame.width , frame.height + shift.y);
			});

			var s = imageView.getSCorner();
			this._addResizeListener(s, imageModel, imageView, function(frame, shift){
				return new goog.math.Rect(frame.left, frame.top, frame.width, frame.height - shift.y);
			});
		},

		/**
		 * @param corner
		 * @param model
		 * @param view
		 * @param handler
		 * @private
		 */
		_addResizeListener: function(corner, model, view, handler) {
			corner.onmousedown = goog.bind(function(event) {
				if ( event.defaultPrevented ) { return; }
				else if ( event.which > 1 ) { return; }
				else if ( !view.isSelected()) {return; }

				var oldFrame = view.getFrame();
				var startPos = new goog.math.Coordinate(event.pageX, event.pageY);

				var keyMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, function(event) {
					var mousePos = new goog.math.Coordinate(event.clientX, event.clientY);
					var shiftMouse = goog.math.Coordinate.difference(startPos, mousePos);

					var newRect = handler(oldFrame, shiftMouse);
					view.setFrame(newRect);

				});

				var keyUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, goog.bind(function() {
					var newframe = view.getFrame();
					if (!goog.math.Rect.equals(newframe, oldFrame))
					{
						var command = new ResizeCommand(model, newframe);
						this._history.recordAction(command);
					}
					goog.events.unlistenByKey(keyMove);
					goog.events.unlistenByKey(keyUp);
				}, this));
				event.preventDefault();
			}, this);
		},

		/**
		 * @param {imageApp.model.Image} model
		 * @param {imageApp.view.ImageView} view
		 * @param {!Event} event
		 * @private
		 */
		_startDrag: function(model, view,  event) {
			if (event.defaultPrevented) { return; }
			var oldPos = model.getFrame().getTopLeft();
			var size = model.getFrame().getSize();
			var elem = view.getDOMElement();

			var shift = goog.math.Coordinate.difference(new goog.math.Coordinate(event.pageX, event.pageY), oldPos);

			var keyMouseMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, goog.bind(function(event) {
				var mousePos = new goog.math.Coordinate(event.clientX, event.clientY);
				var newPos = goog.math.Coordinate.difference(mousePos, shift);
				view.setFrame(new goog.math.Rect(newPos.x, newPos.y, size.width, size.height));
			}, this));

			var keyMouseUp = goog.events.listen(document, goog.events.EventType.MOUSEUP, goog.bind(function() {
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

		deleteImage: function() {
			var index = this._imagesView.getIndexSelectingImage();
			if (String(index))
			{
				var command = new DeleteCommand(this._imagesModel, this._imagesView, index);
				this._history.recordAction(command);
			}
		}

	});
});