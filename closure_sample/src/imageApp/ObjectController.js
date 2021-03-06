goog.provide("imageApp.ObjectController");



goog.require("imageApp.command.AddObjectCommand");
goog.require("imageApp.command.DeleteCommand");
goog.require("imageApp.command.ResizeCommand");
goog.require("imageApp.command.MoveCommand");
goog.require("imageApp.command.AppendTextCommand");
goog.require("imageApp.command.MetaCommand");

goog.require("imageApp.events.EventType");
goog.require("imageApp.events.ObjectEvent");
goog.require("imageApp.events.ActionEvent");

goog.scope(function() {
	var ResizeCommand = imageApp.command.ResizeCommand;
	var AddObjectCommand = imageApp.command.AddObjectCommand;
	var DeleteCommand = imageApp.command.DeleteCommand;
	var AppendTextCommand = imageApp.command.AppendTextCommand;
	var MoveCommand = imageApp.command.MoveCommand;
	var MetaCommand = imageApp.command.MetaCommand;
	var ObjectEvent = imageApp.events.ObjectEvent;


	/**
	 * @param {imageApp.AppModel} model
	 * @param {imageApp.AppView} view
	 * @param {imageApp.command.History} history
	 * @param {imageApp.ObjectCollection} collection
	 * @constructor
	 */
	imageApp.ObjectController = goog.defineClass(null, {
		/**
		 * @param {imageApp.AppModel} model
		 * @param {imageApp.AppView} view
		 * @param {imageApp.command.History} history
		 * @param {imageApp.ObjectCollection} collection
		 */
		constructor: function(model, view, history, collection) {
			/** @private {imageApp.AppModel} */
			this._model = model;
			/** @private {imageApp.AppView} */
			this._view = view;
			/** @private {imageApp.command.History} */
			this._history = history;
			/** @private {imageApp.ObjectCollection} */
			this._objectCollection = collection;
			
			this._addResizeListener();
			this._addTextListener();
			this._addAppendListener();
			this._addDeleteListener();
			this._addMoveListener();
		},

		addTextArea: function () {
			var textAreaModel = this._model.createTextArea("");
			var command = new AddObjectCommand(this._objectCollection, textAreaModel);
			this._history.executeAndRecordAction(command);
		},

		/**
		 * @param {!imageApp.model.Object} object
		 */
		addImage: function(object) {
			var command = new AddObjectCommand(this._objectCollection, object);
			this._history.executeAndRecordAction(command);
		},

		/**
		 * @private
		 */
		_addAppendListener: function () {
			goog.events.listen(this._objectCollection, imageApp.events.EventType.APPEND_OBJECT, goog.bind(function (event) {
				var appendEvent = new ObjectEvent(imageApp.events.EventType.APPEND_OBJECT, event.object);
				this._view.dispatchEvent(appendEvent);
			}, this));
		},

		/**
		 * @private
		 */
		_addDeleteListener: function () {
			goog.events.listen(this._objectCollection, imageApp.events.EventType.REMOVE_OBJECT, goog.bind(function (event) {
				var appendEvent = new ObjectEvent(imageApp.events.EventType.REMOVE_OBJECT, event.object);
				this._view.dispatchEvent(appendEvent);
			}, this));
		},

		/**
		 * @private
		 */
		_addResizeListener: function () {
			goog.events.listen(this._view, imageApp.events.EventType.RESIZE_OBJECT, goog.bind(function(event) {
				var object = /** @type {imageApp.model.Object}*/(event.object);
				var meta = new MetaCommand();
				object.dispatchEvent(new imageApp.events.ActionEvent(imageApp.events.EventType.WAS_RESIZE, meta));
				meta.appendAction(new ResizeCommand(object, event.param));
				this._history.executeAndRecordAction(meta);
			}, this));
		},

		/**
		 * @private
		 */
		_addMoveListener: function () {
			goog.events.listen(this._view, imageApp.events.EventType.MOVE_OBJECT, goog.bind(function(event) {
				var object = /** @type {imageApp.model.Object}*/(event.object);
				var meta = new MetaCommand();
				object.dispatchEvent(new imageApp.events.ActionEvent(imageApp.events.EventType.WAS_RESIZE, meta));
				meta.appendAction(new MoveCommand(object, event.param));
				this._history.executeAndRecordAction(meta);
			}, this));
		},

		_addTextListener: function () {
			goog.events.listen(this._view, imageApp.events.EventType.APPEND_TEXT, goog.bind(function (event) {
				var object = /** @type {imageApp.model.TextArea}*/(event.object);
				var meta = new MetaCommand();
				var action = new AppendTextCommand(event.object, event.param, object.getText());
				action.execute();
				meta.appendAction(action);
				object.dispatchEvent(new imageApp.events.ActionEvent(imageApp.events.EventType.OBJECT_CHANGED, meta));
				this._history.recordExecuteAction(meta);
			}, this));
		},

		deleteObject: function() {
			var key = this._view.getKeySelectedObject();
			if (key !== null)
			{
				var object = this._objectCollection.getObjectOnKey(key);
				if (!object.isDeleted())
				{
					return;
				}
				var command = new DeleteCommand(this._objectCollection, object);
				this._history.executeAndRecordAction(command);
			}
		}
	});
});