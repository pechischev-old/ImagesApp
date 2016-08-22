goog.provide("AppController");

goog.require("AppModel");
goog.require("AppView");
goog.require("command.History");
goog.require("command.MoveCommand");

goog.require("goog.events");
goog.require("goog.events.EventType");

goog.scope(function() {
    var MoveCommand = command.MoveCommand;

    /** 
     * @param {AppModel} model
     * @constructor
     */
    AppController = goog.defineClass(null, {
        /**
         * @param {AppModel} model
         */
        constructor: function(model) {
            /** @private {AppModel} */
            this._model = model;
            /** @private {AppView} */
            this._view = new AppView();

            /** @private {command.History} */
            this._history = new command.History();
            
            this._addActions();
        },

        /** 
         * @private 
         */
        _openFile: function() { 
            var input = window.event.target;
            var reader = new FileReader();
            reader.onload = goog.bind(function() {
                this._addImage(reader.result.toString());
            },  this);
            reader.readAsDataURL(input.files[0]);
        },
        
        /** 
         * @param {string} path
         * @private 
         */
        _addImage: function(path) {
            var img = new Image(0, 0);
            img.src = path;
            img.onload = goog.bind(function(){
                var imageModel = this._model.addImage(new goog.math.Size(img.naturalWidth, img.naturalHeight));
                var imageView = this._view.loadImage(imageModel.getFrame(), path);
                imageModel.registerObserver(imageView);
                var imageElem = imageView.getDOMElement();

                goog.events.listen(imageElem, goog.events.EventType.CLICK, goog.bind(function(event) {
                    this._view.deselectOtherImages();
                    event.stopPropagation();
                    imageView.isVisibleBorder(true);
                }, this));

                goog.events.listen(imageElem.parentElement, goog.events.EventType.CLICK, goog.bind(function() {
                    if (imageView.isSelected())
                    {
                        imageView.isVisibleBorder(false);
                    }
                }, imageView));

                imageElem.onmousedown = goog.bind(function(event) {
                    if (event.which > 1) return;
                    if (imageView.isSelected() )
                    {
                        imageModel.setCoordinatesOfMouseFirstClick(new goog.math.Coordinate(event.pageX, event.pageY));
                        this._startDrag(imageModel, imageElem, event);
                    }
                }, this);

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
                //var command = new MoveCommand(model, new goog.math.Coordinate(event.clientX, event.clientY));
                //this._history.recordAction(command);
                model.move(new goog.math.Coordinate(event.clientX, event.clientY));
            }, this);

            elem.onmouseup = goog.bind(function() {
                document.onmousemove = null;
                elem.onmouseup = null;
            }, this);

        },

	    /**
         * @private
         */
        _undo: function(){
            console.log("undo");
            this._history.undo();
        },

	    /**
         * @private
         */
        _redo: function() {
            console.log("redo");
            this._history.redo();
        },

        /**
         * @private 
         */
        _addActions: function() {
            var toolbar = this._view.getToolbar();
            toolbar.getButtonOnIndex(0).setAction(goog.bind(this._undo, this));
            toolbar.getButtonOnIndex(1).setAction(goog.bind(this._redo, this));
            toolbar.getButtonOnIndex(2).setAction(goog.bind(this._inputProcessing, this));
            var fileForm = this._view.setActionFileReader(goog.bind(this._openFile, this));
        },

        /** 
         * @private 
         */
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