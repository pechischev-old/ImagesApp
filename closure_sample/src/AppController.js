goog.provide("AppController");

goog.require("AppModel");
goog.require("AppView");
goog.require("command.CommandsImage");


//goog.require("goog.events");
//goog.require("goog.events.EventType");

goog.scope(function() {
    var commandsImage = command.CommandsImage;


    /** @param {AppModel} model
      * @constructor
      */
    AppController = goog.defineClass(null, {
        constructor: function(model) {
            /** @private {AppModel} */
            this._model = model;
            /** @private {AppView} */
            this._view = new AppView();
            this._addActions();
            /** @private {Array<command.ICommand>} */
            this._commands = [];
            /** @private {command.ICommand}*/
            this._command = null;
            /**@private {command.CommandsImage} */
            this._cmdImage = new commandsImage();
        },

        /** @private */
        _openFile: function() { 
            var input = window.event.target;
            var reader = new FileReader();
            reader.onload = goog.bind(function() {
                this._addImage(reader.result.toString());
            },  this);
            reader.readAsDataURL(input.files[0]);
        },

        /** @private */
        _undo: function () {

            if (this._commands.length == 0)
            {
                throw new Error("Command stack is empty");
            }
            console.log("undo");
            this._commands.pop();
            this._command.undo();

        },
        
        /** @param {string} path
         * @private */
        _addImage: function(path) {
            var imageModel = this._model.addImage(path);
            var imageView = this._view.loadImage(imageModel.getFrame(), path);
            imageModel.registerObserver(imageView);
            var id = setInterval(function () {
                var frame = imageModel.getFrame();
                frame.top += 25;
                frame.left += 5;
                imageModel.setFrame(frame);
            }, 1500);
        },
        
        /** @private */
        _addActions: function() {
            var toolbar = this._view.getToolbar();
            toolbar.getButtonOnIndex(0).setAction(goog.bind(this._undo, this));
            toolbar.getButtonOnIndex(1).setAction(function(){console.log("redo")});
            toolbar.getButtonOnIndex(2).setAction(goog.bind(this._inputProcessing, this));
            var fileForm = this._view.setActionFileReader(goog.bind(this._openFile, this));
            
        },

        /** @private */
        _inputProcessing: function() {
            var dataInputForm = this._view.getDataInputForm();
            if (dataInputForm)
            {
                this._addImage(dataInputForm);
            }
            else
            {
                this._view.clickFileReader();
            }
        }
        
       
    });
});