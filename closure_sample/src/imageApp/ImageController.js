goog.provide("imageApp.ImageController");

goog.require("imageApp.command.MoveCommand");
goog.require("imageApp.command.AddImageCommand");
goog.require("imageApp.command.DeleteCommand");
goog.require("imageApp.command.ResizeCommand");

goog.require("imageApp.view.ImagesView");

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
 		 * @param {imageApp.view.ImagesView} imagesView
		 * @param {imageApp.command.History} history
		 */
		constructor: function (imagesModel, imagesView, history) {
			/** @private {imageApp.model.ImagesModel} */
			this._imagesModel = imagesModel;
			/** @private {imageApp.view.ImagesView} */
			this._imagesView = imagesView;

			/** @private {imageApp.command.History} */
			this._history = history;

			document.addEventListener("append", goog.bind(function (event) {
				/** @type {imageApp.model.Image} */
				//var imageModel = ('model' in event.detail) ? event.detail['model'] : event.detail;
				var imageModel = event.detail.model;
				/** @type {imageApp.view.ImageView} */
				var imageView = new imageApp.view.ImageView(imageModel.getFrame(), imageModel.getPath());
				imageModel.registerObserver(imageView);
				this._imagesView.insertImageOnIndex(imageView, event.detail.index);
				this._addHandlers(imageModel, imageView);

			}, this), false);

			document.addEventListener("delete", goog.bind(function (event) {
				this._imagesView.removeImageOnIndex(event.detail.index);
			}, this), false);
		},

		/**
		 * @param {string} path
		 */
		addImage: function(path) {
			goog.style.setStyle(document.documentElement, "cursor", "progress");
			var img = new Image(0, 0);
			img.src = path;
			img.onload = goog.bind(this._onLoadImage, this, img);
		},

		/**
		 * @param {Image} elem
		 * @private
		 */
		_onLoadImage: function(elem) {
			var imageModel = this._imagesModel.createImage(new goog.math.Size(elem.naturalWidth, elem.naturalHeight), elem.src);

			var command = new AddImageCommand(this._imagesModel, imageModel);
			this._history.recordAction(command);

			goog.style.setStyle(document.documentElement, "cursor", "default");

		},

		/**
		 * @param {imageApp.model.Image} imageModel
		 * @param {imageApp.view.ImageView} imageView
		 * @private
		 */
		_addHandlers: function(imageModel, imageView) {
			var imageElem = imageView.getDOMElement();

			goog.events.listen(imageElem.parentElement, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
				if (event.defaultPrevented)
				{
					return false;
				}
				if (imageView.isSelected())
				{
					imageView.setVisibleBorder(false);
				}
			}, this));

			goog.events.listen(imageElem, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
				this._imagesView.deselectOtherImages();

				imageView.setVisibleBorder(true);
				if (event.defaultPrevented || event.which > 1 || !imageView.isSelected())
				{
					return;
				}
				this._startDrag(imageModel, imageView, event);
				event.preventDefault();
			}, this));


			var nw = imageView.getNWCorner();
			this._addResizeListener(nw, imageModel, imageView, goog.bind(function(frame, shift){
				return this._imagesModel.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top - shift.y, frame.width + shift.x, frame.height + shift.y), imageView.getPos());
			}, this));

			var ne = imageView.getNECorner();
			this._addResizeListener(ne, imageModel, imageView, goog.bind(function(frame, shift){
				return this._imagesModel.getMinFrame(new goog.math.Rect(frame.left, frame.top - shift.y, frame.width - shift.x, frame.height + shift.y), imageView.getPos());
			}, this));

			var sw = imageView.getSWCorner();
			this._addResizeListener(sw, imageModel, imageView, goog.bind(function(frame, shift){
				return this._imagesModel.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top , frame.width + shift.x, frame.height - shift.y), imageView.getPos());
			}, this));

			var se = imageView.getSECorner();
			this._addResizeListener(se, imageModel, imageView, goog.bind(function(frame, shift){
				return this._imagesModel.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height - shift.y), imageView.getPos());
			}, this));

			var e = imageView.getECorner();
			this._addResizeListener(e, imageModel, imageView, goog.bind(function(frame, shift){
				return this._imagesModel.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width - shift.x, frame.height), imageView.getPos());
			}, this));

			var w = imageView.getWCorner();
			this._addResizeListener(w, imageModel, imageView, goog.bind(function(frame, shift){
				return this._imagesModel.getMinFrame(new goog.math.Rect(frame.left - shift.x, frame.top, frame.width + shift.x, frame.height), imageView.getPos());
			}, this));

			var n = imageView.getNCorner();
			this._addResizeListener(n, imageModel, imageView, goog.bind(function(frame, shift){
				return this._imagesModel.getMinFrame(new goog.math.Rect(frame.left, frame.top - shift.y, frame.width , frame.height + shift.y), imageView.getPos());
			}, this));

			var s = imageView.getSCorner();
			this._addResizeListener(s, imageModel, imageView, goog.bind(function(frame, shift){
				return this._imagesModel.getMinFrame(new goog.math.Rect(frame.left, frame.top, frame.width, frame.height - shift.y), imageView.getPos());
			}, this));
		},


		/**
		 * @param {!Element} corner
		 * @param {imageApp.model.Image} model
		 * @param {imageApp.view.ImageView} view
		 * @param {function(!goog.math.Rect, !goog.math.Coordinate): !goog.math.Rect} handler
		 * @private
		 */
		_addResizeListener: function(corner, model, view, handler) {
			goog.events.listen(corner, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
				if ( event.defaultPrevented || event.which > 1 || !view.isSelected())
				{
					return;
				}

				var oldFrame = view.getFrame();
				var startPos = new goog.math.Coordinate(event.screenX, event.screenY);

				var keyMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, function(event) {
					var mousePos = new goog.math.Coordinate(event.screenX, event.screenY);
					var shiftMouse = goog.math.Coordinate.difference(startPos, mousePos);

					var newRect = handler(oldFrame, shiftMouse);
					//if (view.isContain(newRect))
					//{
						view.setFrame(newRect);
					//}
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
			}, this));
		},

		/**
		 * @param {imageApp.model.Image} model
		 * @param {imageApp.view.ImageView} view
		 * @param {!Event} event
		 * @private
		 */
		_startDrag: function(model, view,  event) {
			if (event.defaultPrevented)
			{
				return;
			}
			var oldPos = model.getFrame().getTopLeft();
			var size = model.getFrame().getSize();

			var shift = goog.math.Coordinate.difference(new goog.math.Coordinate(event.screenX, event.screenY), oldPos);

			var keyMouseMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, function(event) {
				var mousePos = new goog.math.Coordinate(event.screenX, event.screenY);
				var newPos = goog.math.Coordinate.difference(mousePos, shift);
				var newFrame = new goog.math.Rect(newPos.x, newPos.y, size.width, size.height);

				//if (view.isContain(newFrame))
				//{
					view.setFrame(newFrame);
				//}
			});

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
			if (index !== null)
			{
				var command = new DeleteCommand(this._imagesModel, index);
				this._history.recordAction(command);
			}
		}

	});
});