goog.provide("AppController");

goog.require("AppModel");
goog.require("AppView");
goog.require("command.CommandsImage");

/*goog.require("goog.events");
goog.require("goog.events.EventType");*/

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
            /** @private {command.ICommand} */
            this._command = null;
        },

        eventLoop: function () {

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

        /** @param {number} index
         * @param {!goog.math.Coordinate} posMouse
         * @private */
        _move: function (index, posMouse) {
            var cmdImage = new commandsImage(this._model.getImageOfIndex(index));
            this._command = new command.MoveCommand(cmdImage, posMouse);
            this._commands.push(this._command);
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
            var imageElem = imageView.getDOMElement();
           
            imageElem.onmousedown = goog.bind(function(event) {
                if (imageView.isSelected())
                {
                    imageModel.setCoordinatesOfMouseFirstClick(new goog.math.Coordinate(event.pageX, event.pageY));
                    this._startDrag(imageModel, imageElem, event);
                }
            }, this);
            
            
        },

	    /**
         * @param {model.Image} model
         * @param {!Element} elem
         * @param {!Event} event
	     * @private
         */
        _startDrag: function(model, elem,  event) {
            var posX = model.getFrame().left;
            var posY = model.getFrame().top;

            document.onmousemove = goog.bind(function(event) {
                model.move(new goog.math.Coordinate(event.clientX, event.clientY));
                model.setFrame(model.getFrame());
            }, model);

            elem.onmouseup = goog.bind(function() {
                document.onmousemove = null;
                elem.onmouseup = null;
            }, this);

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