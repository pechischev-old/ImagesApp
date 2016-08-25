goog.provide("imageApp.observer.IObserver");
goog.provide("imageApp.observer.IObservable");

/** @interface */
imageApp.observer.IObserver = function() {};
imageApp.observer.IObserver.prototype.update = goog.abstractMethod;

/** @interface */
imageApp.observer.IObservable = function() {};
imageApp.observer.IObservable.prototype = {

    registerObserver: goog.abstractMethod,

    removeObserver: goog.abstractMethod,

    notifyObservers: goog.abstractMethod
};

