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
        /** @param {!goog.math.Coordinate} posMouse*/
        move: function(posMouse) {
            this._model.move(posMouse);
        },
        /** @param {!goog.math.Coordinate} posMouse*/
        resize: function(posMouse) {
            this._model.resize(posMouse);
        },

        /** @return {!goog.math.Coordinate} */
        getOldPos: function() {
            return this._model.getFrame().getTopLeft();
        }
    });

    /** @param {command.CommandsImage} image
     * @param {!goog.math.Coordinate} posMouse
     * @implements {command.ICommand}
     * @constructor*/
    command.MoveCommand = goog.defineClass(null, {
        constructor: function(image, posMouse) {
            /** @private {command.CommandsImage} */
            this._image = image;
            /** @private {!goog.math.Coordinate} */
            this._posMouse = posMouse;
        },

        execute: function() {
            this._image.move(this._posMouse);
        },

        undo: function() {
            var oldPos = this._image.getOldPos();
            this._image.move(oldPos);
        }
    });

    /** @param {command.CommandsImage} image
     * @param {!goog.math.Coordinate} posMouse
     * @implements {command.ICommand}
     * @constructor*/
    command.ResizeCommand = goog.defineClass(null, {
        constructor: function(image, posMouse) {
            /** @private {command.CommandsImage} */
            this._image = image;
            /** @private {!goog.math.Coordinate} */
            this._posMouse = posMouse;
        },

        execute: function() {
            this._image.resize(this._posMouse);
        },

        undo: function() {
            var oldPos = this._image.getOldPos();
            this._image.move(oldPos);
        }
    });
});