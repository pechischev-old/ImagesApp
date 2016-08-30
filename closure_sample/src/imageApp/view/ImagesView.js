goog.provide("imageApp.view.ImagesView");

goog.require("imageApp.view.ObjectView");


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
			/** @private {Array<imageApp.view.ObjectView>} */
			this._objectsView = [];
			/** @private {!Element} */
			this._canvas = canvas;
		},

		/**
		 * @return {?number}
		 */
		getIndexSelectingImage: function() {
			for (var i = 0; i < this._objectsView.length; ++i)
			{
				if (this._objectsView[i].isSelected())
				{
					return i;
				}
			}
			return null;
		},

		/**
		 * @param {number} index
		 * @return {imageApp.view.ObjectView}
		 */
		removeImageOnIndex: function(index) {
			var image;
			if (index == -1)
			{
				
				image = this._objectsView.pop();
				this._deleteFromDOM(image);
				return image;
			}
			else if (index < 0 && index >= this._objectsView.length )
			{
				throw new Error("index is out of range array");
			}
			else
			{
				image = this._objectsView.splice(index, 1)[0];
				this._deleteFromDOM(image);
				return image;
			}

		},

		/**
		 * @param {imageApp.view.ObjectView} image
		 * @private
		 */
		_deleteFromDOM: function (image) {
			var img = image.getDOMElement();
			img.parentNode.removeChild(img);
		},

		/**
		 * @param {imageApp.view.ObjectView} image
		 * @param {number} index
		 */
		insertImageOnIndex:function(image, index) {
			index = (index == -1) ? this._objectsView.length : index;
			this._objectsView.splice(index, 0, image);
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
			this._objectsView.forEach(function(image) {
				if (image.isSelected())
				{
					image.setVisibleBorder(false);
				}
			});
		}
	});
});