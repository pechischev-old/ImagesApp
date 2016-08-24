goog.provide("view.ImagesView");

goog.require("view.ImageView");

goog.scope(function () {

	/**
	 * @param {!Element} canvas
	 * @constructor
	 */
	view.ImagesView = goog.defineClass(null, {

		/**
		 * @param {!Element} canvas
		 */
		constructor: function (canvas) {
			/** @private {Array<view.ImageView>} */
			this._imagesView = [];
			/** @private {!Element} */
			this._canvas = canvas;
		},

		/**
		 * @return {?number}
		 */
		getIndexSelectingImage: function() {
			for (var i = 0; i < this._imagesView.length; ++i)
			{
				if (this._imagesView[i].isSelected())
				{
					return i;
				}
			}
			return null;
		},

		/**
		 * @param {number} index
		 * @return {view.ImageView}
		 */
		removeImageOnIndex: function(index) {
			if (index < 0 && index >= this._imagesView.length )
			{
				throw new Error("index is out of range array");
			}
			var image = this._imagesView.splice(index, 1)[0];
			var img = image.getDOMElement();
			img.parentNode.removeChild(img);
			return image;
		},

		/**
		 * @param {view.ImageView} image
		 * @param {number} index
		 */
		insertImageOnIndex:function(image, index) {
			this._imagesView.splice(index, 0, image);
			if (this._canvas.childElementCount >= index)
			{
				this._canvas.insertBefore(image.getDOMElement(), this._canvas.children[index]);
			}
			else
			{
				this._canvas.appendChild(image.getDOMElement());
			}

		},

		deleteImage: function () {
			var image = this._imagesView.pop().getDOMElement();
			image.parentNode.removeChild(image);
		},

		deselectOtherImages: function() {
			this._imagesView.forEach(function(image) {
				if (image.isSelected())
				{
					image.setVisibleBorder(false);
				}
			});
		},


		/**
		 * @param {!goog.math.Rect} frame
		 * @param {string} path
		 */
		addImage: function(frame, path) {
			/** @type {view.ImageView} */
			var image = new view.ImageView(frame, path);
			this._imagesView.push(image);
			return image;
		}
	});
});