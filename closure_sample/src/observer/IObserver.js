goog.provide("observer.IObserver");
goog.provide("observer.IObservable");

/** @interface */
observer.IObserver = function() {};
observer.IObserver.prototype.update = goog.abstractMethod;

/** @interface */
observer.IObservable = function() {};
observer.IObservable.prototype = {

    registerObserver: goog.abstractMethod,

    removeObserver: goog.abstractMethod,

    notifyObservers: goog.abstractMethod
};

