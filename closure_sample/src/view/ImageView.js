goog.provide("view.ImageView");


goog.require("goog.dom");
goog.require("view.Border");
goog.require("observer.IObserver");
goog.require("view.Node");

goog.scope(function() {
    /** @const {Array<string>} */
    const CLASSES = ['se', 's', 'sw', 'e', 'w', 'ne', 'n', 'nw'];
    
    /**
     * @param {!goog.math.Rect} frame
     * @param {string} path
     * @implements {observer.IObserver}
     * @extends {view.Node}
     * @constructor
     */
    view.ImageView = goog.defineClass(view.Node, {
        constructor: function(frame, path) {
            goog.base(this);
            /** @private {string} */
            this._path = path;
            /** @private {boolean} */
            this._isSelected = false;
            /** @private {!goog.math.Rect} */
            this._frame = frame;

            this._init();
        },

        /** 
         * @return {boolean} 
         */
        isSelected: function () {
            return this._isSelected;
        },

        /** 
         * @param {!goog.math.Rect} frame 
         */
        update: function(frame) {
            this.setFrame(frame);
            this._border.setFrame(frame);
        },

        /** 
         * @param {boolean} isVisible
         */
        setVisibleBorder: function(isVisible) {
            this._isSelected = isVisible;
            if (this.isSelected())
            {
                this._border.activeBorder();
            }
            else
            {
                this._border.deactiveBorder();
            }
        },

        /** 
         * @param {!goog.math.Rect} frame 
         */
        setFrame: function(frame){
            this._frame = frame;
            this._reloadStyleSize();
            this._border.setFrame(frame);
        },

		/**
         * @returns {!goog.math.Rect}
         */
        getFrame: function() {
            return this._frame;
        },

		/**
		 * @return {!goog.math.Coordinate}
         */
        getPos: function() {
            return this._frame.getTopLeft();
        },

        /**
         * @return {!Element}
         * @override 
         */
        getDOMElement: function(){
            return this._container;
        },
	    
        /** 
         * @private 
         */
        _reloadStyleSize: function() {
            this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);
            var image = this._container.getElementsByTagName(goog.dom.TagName.IMG)[0];
            this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
        },

		/**
         * @param {!goog.math.Coordinate} position
         * @returns {boolean}
         */
        checkOutputAbroadForResize:function(position) {
            return this._frame.contains(position);

        },
	    
        /**
         * @private
         */
        _init: function() {
            /** @private {!Element} */
            this._container = document.createElement(goog.dom.TagName.DIV);
            this._container.setAttribute("class", "capture");

            this._setStyleElementPosition(new goog.math.Coordinate(this._frame.left, this._frame.top), this._container);

            var image = document.createElement(goog.dom.TagName.IMG);
            image.setAttribute("src", this._path);
            image.setAttribute("alt", "текст");
            this._setStyleElementSize(new goog.math.Size(this._frame.width, this._frame.height), image);
            this._container.appendChild(image);

            /** @private {view.Border} */
            this._border = new view.Border(this._frame);
            this._container.appendChild(this._border.getDOMElement());
            
            this._initCorners();
        },

		/**
		 * @private
         */
        _initCorners: function () {
            /** @private {!Element} */
            this._SECorner = this._border.createCorner(CLASSES[0]);
            /** @private {!Element} */
            this._SCorner = this._border.createCorner(CLASSES[1]);
            /** @private {!Element} */
            this._SWCorner = this._border.createCorner(CLASSES[2]);
            /** @private {!Element} */
            this._ECorner = this._border.createCorner(CLASSES[3]);
            /** @private {!Element} */
            this._WCorner = this._border.createCorner(CLASSES[4]);
            /** @private {!Element} */
            this._NECorner = this._border.createCorner(CLASSES[5]);
            /** @private {!Element} */
            this._NCorner = this._border.createCorner(CLASSES[6]);
            /** @private {!Element} */
            this._NWCorner = this._border.createCorner(CLASSES[7]);
        },

        /** @return {!Element} */
        getSECorner: function() {
            return this._SECorner;
        },

        /** @return {!Element} */
        getSWCorner: function() {
            return this._SWCorner;
        },

        /** @return {!Element} */
        getNWCorner: function() {
            return this._NWCorner;
        },

        /** @return {!Element} */
        getNECorner: function() {
            return this._NECorner;
        }

    });
});