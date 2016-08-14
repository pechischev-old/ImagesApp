goog.provide("command.CommandsImage");
goog.provide("command.SelectCommand");
goog.provide("command.NotSelectCommand");
goog.provide("command.MoveCommand");
goog.provide("command.ResizeCommand");

goog.require("model.Image");
goog.require("command.ICommand");

goog.scope(function() {

    /** 
     * @param {model.Image} model
     * @constructor
     */
    command.CommandsImage = goog.defineClass(null, {
        constructor: function (model) {
            /** @private {model.Image} */
            this._model = model;
        },

        select: function() {
            this._model.setSelected(true)
        },

        notSelect: function() {
            this._model.setSelected(false)
        },

        move: function() {

        },

        resize: function() {

        }
    });

    /** @param {command.CommandsImage} image
     * @implements {command.ICommand}
     * @constructor*/
    command.SelectCommand = goog.defineClass(null, {
        constructor: function(image) {
            /** @private {command.CommandsImage} */
            this._image = image;
        },

        execute: function() {
            this._image.select();
        },

        undo: function() {
            this._image.notSelect();
        }
    });

    /** @param {command.CommandsImage} image
     * @implements {command.ICommand}
     * @constructor*/
    command.NotSelectCommand = goog.defineClass(null, {
        constructor: function(image) {
            /** @private {command.CommandsImage} */
            this._image = image;
        },

        execute: function() {
            this._image.notSelect();
        },

        undo: function() {
            this._image.select();
        }
    });

    /** @param {command.CommandsImage} image
     * @implements {command.ICommand}
     * @constructor*/
    command.MoveCommand = goog.defineClass(null, {
        constructor: function(image) {
            /** @private {command.CommandsImage} */
            this._image = image;
        },

        execute: function() {
            this._image.move();
        },

        undo: function() {
            //this._image.select();
        }
    });

    /** @param {command.CommandsImage} image
     * @implements {command.ICommand}
     * @constructor*/
    command.ResizeCommand = goog.defineClass(null, {
        constructor: function(image) {
            /** @private {command.CommandsImage} */
            this._image = image;
        },

        execute: function() {
            this._image.resize();
        },

        undo: function() {
            //this._image.select();
        }
    });
});