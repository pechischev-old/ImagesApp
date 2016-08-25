goog.provide("imageApp.view.ImagesView");

goog.require("imageApp.view.ImageView");

goog.scope(function () {

	/**
	 * @param {!Element} canvas
	 * @constructor
	 */
	imageApp.view.ImagesView = goog.defineClass(null, {

		/**
		 * @param {!Element} canvas
		 */
		constructor: function (canvas) {
			/** @private {Array<imageApp.view.ImageView>} */
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
		 * @return {imageApp.view.ImageView}
		 */
		removeImageOnIndex: function(index) {
			var image;
			if (index == -1)
			{
				
				image = this._imagesView.pop();
				this._deleteFromDOM(image);
				return image;
			}
			else if (index < 0 && index >= this._imagesView.length )
			{
				throw new Error("index is out of range array");
			}
			else
			{
				image = this._imagesView.splice(index, 1)[0];
				this._deleteFromDOM(image);
				return image;
			}

		},

		/**
		 * @param {imageApp.view.ImageView} image
		 * @private
		 */
		_deleteFromDOM: function (image) {
			var img = image.getDOMElement();
			img.parentNode.removeChild(img);
		},

		/**
		 * @param {imageApp.view.ImageView} image
		 * @param {number} index
		 */
		insertImageOnIndex:function(image, index) {
			index = (index == -1) ? this._imagesView.length : index;
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

		deselectOtherImages: function() {
			this._imagesView.forEach(function(image) {
				if (image.isSelected())
				{
					image.setVisibleBorder(false);
				}
			});
		}
	});
});