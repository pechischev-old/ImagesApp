goog.provide("imageApp.ObjectCollection");


goog.require("imageApp.model.Object");
goog.require("goog.structs.Map");

goog.require("imageApp.events.EventType");
goog.require("goog.events.EventTarget");


goog.scope(function () {

	/**
	 * @extends {goog.events.EventTarget}
	 * @constructor
	 */
	imageApp.ObjectCollection = goog.defineClass(goog.events.EventTarget, {

		constructor: function() {
			goog.base(this);
			/** @private {goog.structs.Map<number, imageApp.model.Object>} */
			this._objectsModel = new goog.structs.Map();
		},

		/**
		 * @param {imageApp.model.Object} object
		 */
		removeObject: function(object) {
			var removeEvent = new CustomEvent(imageApp.events.EventType.REMOVE_OBJECT, {
				detail: object
			});
			object.setRemoved(true);
			this._objectsModel.remove(goog.getUid(object));
			this.dispatchEvent(removeEvent);
		},


		/**
		 * @param {imageApp.model.Object} object
		 */
		appendObject: function(object) {
			var appendEvent = new CustomEvent(imageApp.events.EventType.APPEND_OBJECT, {
				detail: object
			});
			object.setRemoved(false);
			this._objectsModel.set(goog.getUid(object), object);
			this.dispatchEvent(appendEvent);
		},

		/**
		 * @param {*} key
		 * @return {!imageApp.model.Object}
		 */
		getObjectOnKey: function(key){
			return this._objectsModel.get(key);
		}
	});
});