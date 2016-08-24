goog.provide("AppController");

goog.require("AppModel");
goog.require("AppView");
goog.require("command.History");
goog.require("command.MoveCommand");
goog.require("command.AddImageCommand");
goog.require("command.DeleteCommand");

goog.require("goog.events");
goog.require("goog.events.EventType");

goog.scope(function() {
    var MoveCommand = command.MoveCommand;
    var AddImageCommand = command.AddImageCommand;
    var DeleteCommand = command.DeleteCommand;
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
                var funcAddImage = goog.bind(this._addImage, this, reader.result.toString());
                var funcDeleteImage = goog.bind(this._deleteImage, this);
                var command = new AddImageCommand(funcAddImage, funcDeleteImage);
                this._history.recordAction(command);
                //this._addImage(reader.result.toString());
            },  this);
            reader.readAsDataURL(input.files[0]);
        },

		/**
         * @private
         */
        _deleteImage: function() {
            this._model.deleteImage();
            this._view.deleteImage();
        },
        
        /** 
         * @param {string} path
         * @private 
         */
        _addImage: function(path) { // TODO: отметить загрузку картинки
            var img = new Image(0, 0);
            img.src = path;
            img.onload = goog.bind(function(){
                var imageModel = this._model.addImage(new goog.math.Size(img.naturalWidth, img.naturalHeight));
                var imageView = this._view.loadImage(imageModel.getFrame(), path);
                imageModel.registerObserver(imageView);
                var imageElem = imageView.getDOMElement();

                /*goog.events.listen(imageElem, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
                    this._view.deselectOtherImages();
                    imageView.setVisibleBorder(true);
                    if (event.defaultPrevented)
                    {
                        return ;
                    }
                    else if (event.which > 1) {
                        return;
                    }
                    if (imageView.isSelected() )
                    {
                        this._startDrag(imageModel, imageView, event);
                    }
                    event.preventDefault();
                }, this));*/

                goog.events.listen(imageElem.parentElement, goog.events.EventType.MOUSEDOWN, goog.bind(function(event) {
                    if (event.defaultPrevented)
                    {
                        return;
                    }
                    else if (imageView.isSelected())
                    {
                        imageView.setVisibleBorder(false);
                    }
                }, this));


                imageElem.onmousedown = goog.bind(function(event) {

                    this._view.deselectOtherImages();

                    imageView.setVisibleBorder(true);
                    if (event.defaultPrevented)
                    {
                        return;
                    }
                    else if (event.which > 1) {
                        return;
                    }
                    if (imageView.isSelected() )
                    {
                        this._startDrag(imageModel, imageView, event);
                    }
                    event.preventDefault();
                }, this);

            }, this);
        },

	    /**
         * @param {model.Image} model
         * @param {view.ImageView} view
         * @param {!Event} event
	     * @private
         */
        _startDrag: function(model, view,  event) {
            var oldPos = model.getFrame().getTopLeft();
            var size = model.getFrame().getSize();
            var elem = view.getDOMElement();

            var shift = goog.math.Coordinate.difference(new goog.math.Coordinate(event.pageX, event.pageY), oldPos);

            var keyMouseMove = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, goog.bind(function(event) {
                var mousePos = new goog.math.Coordinate(event.clientX, event.clientY);
                var newPos = goog.math.Coordinate.difference(mousePos, shift);
                view.setFrame(new goog.math.Rect(newPos.x, newPos.y, size.width, size.height));
            }, this));

            var keyMouseUp = goog.events.listen(elem, goog.events.EventType.MOUSEUP, goog.bind(function() {
                var newPos = view.getPos();
                if (!goog.math.Coordinate.equals(newPos,oldPos))
                {
                    var command = new MoveCommand(model, newPos);
                    this._history.recordAction(command);
                }
                goog.events.unlistenByKey(keyMouseMove);
                goog.events.unlistenByKey(keyMouseUp);
            }, this));

        },

	    /**
         * @private
         */
        _undo: function(){
            this._history.undo();
        },

	    /**
         * @private
         */
        _redo: function() {
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
            toolbar.getButtonOnIndex(3).setAction(goog.bind(this._deleteSelectingImage, this));
            var fileForm = this._view.setActionFileReader(goog.bind(this._openFile, this));
        },

		/**
		 * @private
         */
        _deleteSelectingImage:function() {
            var index = this._view.getIndexSelectingImage();
            if (String(index))
            {
                var command = new DeleteCommand(this._model, this._view, index);
                this._history.recordAction(command);
            }
        },

        /**
         * @private 
         */
        _inputProcessing: function() {
            var dataInputForm = this._view.getDataInputForm();
            if (dataInputForm)
            {
                var funcAddImage = goog.bind(this._addImage, this, dataInputForm);
                var funcDeleteImage = goog.bind(this._deleteImage, this);
                var command = new AddImageCommand(funcAddImage, funcDeleteImage);
                this._history.recordAction(command);
            }
            else
            {
                this._view.clickFileReader();
            }
        }
    });
});