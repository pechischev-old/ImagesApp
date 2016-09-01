goog.provide("imageApp.ObjectCollection");


goog.require("imageApp.model.Object");
goog.require("goog.structs.Map");

goog.require("imageApp.view.ObjectViewFactory");


goog.scope(function () {

	/**
	 * @param {!Element} canvas
	 * @constructor
	 */
	imageApp.ObjectCollection = goog.defineClass(null, {
		/**
		 * @param {!Element} canvas
		 */
		constructor: function(canvas) {
			/** @private {goog.structs.Map<string, imageApp.view.ObjectView>} */
			this._objects = new goog.structs.Map();
			/** @private {!Element} */
			this._canvas = canvas;
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		removeObject: function(object) {
			var id = goog.getUid(object);
			var view = this._objects.get(id);
			this._canvas.removeChild(view.getDOMElement());
			this._objects.remove(id);
		},

		/**
		 * @param {imageApp.model.Object} object
		 * @param {?imageApp.model.Object} predObj
		 */
		insertObject: function(object, predObj) {
			if (predObj === null)
			{
				this.appendObject(object);
			}
			else
			{

				var predImg = this._objects.get(goog.getUid(predObj)).getDOMElement();
				var view = imageApp.view.ObjectViewFactory.createObject(object);
				object.registerObserver(view);
				this._canvas.insertBefore(view.getDOMElement(), predImg);
				this._objects.set(goog.getUid(object), view);
			}
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		appendObject: function(object) {
			var view = imageApp.view.ObjectViewFactory.createObject(object);
			object.registerObserver(view);
			this._canvas.appendChild(view.getDOMElement());
			this._objects.set(goog.getUid(object), view);
		},

		/**
		 * @param {imageApp.view.ObjectView} view
		 * @return {?imageApp.model.Object}
		 */
		getObjectKey: function(view) {
			var keys = this._objects.getKeys();
			for (var i = 0; i < keys.length; ++i)
			{
				if (this._objects[keys[i]] == view)
				{
					return keys[i];
				}
			}
			return null;
		},


		deselectOtherImages: function() {
			this._objects.forEach(function(view) {
				if (view.isSelected())
				{
					view.setVisibleBorder(false);
				}
			});
		}
	});
});