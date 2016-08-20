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
	    /**
         * @param {model.Image} model
         */
        constructor: function(model) {
            /** 
             * @private {model.Image} 
             */
            this._model = model;
        },
        /** 
         * @param {!goog.math.Coordinate} mousePos
         */
        move: function(mousePos) {
            this._model.move(mousePos);
        },
        /** 
         * @param {!goog.math.Coordinate} mousePos
         */
        resize: function(mousePos) {
            this._model.resize(mousePos);
        },

        /**
         * @return {!goog.math.Coordinate} 
         */
        getOldPos: function() {
            return this._model.getFrame().getTopLeft();
        }
    });

    /** 
     * @param {command.CommandsImage} image
     * @param {!goog.math.Coordinate} mousePos
     * @implements {command.ICommand}
     * @constructor
     */
    command.MoveCommand = goog.defineClass(null, {
        /**
         * @param {command.CommandsImage} image
         * @param {!goog.math.Coordinate} mousePos
         */
        constructor: function(image, mousePos) {
            /** 
             * @private {command.CommandsImage} 
             */
            this._image = image;
            /** 
             * @private {!goog.math.Coordinate} 
             */
            this._mousePos = mousePos;
        },

        execute: function() {
            this._image.move(this._mousePos);
        },

        undo: function() {
            var oldPos = this._image.getOldPos();
            this._image.move(oldPos);
        }
    });

    /** 
     * @param {command.CommandsImage} image
     * @param {!goog.math.Coordinate} mousePos
     * @implements {command.ICommand}
     * @constructor
     */
    command.ResizeCommand = goog.defineClass(null, {
        /**
         * @param {command.CommandsImage} image
         * @param {!goog.math.Coordinate} mousePos
         */
        constructor: function(image, mousePos) {
            /** 
             * @private {command.CommandsImage} 
             */
            this._image = image;
            /** 
             * @private {!goog.math.Coordinate} 
             */
            this._mousePos = mousePos;
        },

        execute: function() {
            this._image.resize(this._mousePos);
        },

        undo: function() {
            var oldPos = this._image.getOldPos();
            this._image.move(oldPos);
        }
    });
});