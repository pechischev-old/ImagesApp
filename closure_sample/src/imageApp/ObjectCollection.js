goog.provide("imageApp.ObjectCollection");


goog.require("imageApp.model.Object");
goog.require("goog.structs.Map");


goog.scope(function () {

	/**
	 * @constructor
	 */
	imageApp.ObjectCollection = goog.defineClass(null, {

		constructor: function() {
			/** @private {goog.structs.Map<number, imageApp.model.Object>} */
			this._objectsModel = new goog.structs.Map();
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		removeObject: function(object) {
			var removeEvent = new CustomEvent("remove", {
				detail: object
			});
			this._objectsModel.remove(goog.getUid(object));
			document.dispatchEvent(removeEvent);
		},


		/**
		 * @param {imageApp.model.Object} object
		 */
		appendObject: function(object) {
			var appendEvent = new CustomEvent("append", {
				detail: object
			});
			this._objectsModel.set(goog.getUid(object), object);
			document.dispatchEvent(appendEvent);
		},

		/**
		 * @param {number} key
		 * @return {imageApp.model.Object}
		 */
		getObjectOnKey: function(key){
			return this._objectsModel.get(key);
		}
	});
});