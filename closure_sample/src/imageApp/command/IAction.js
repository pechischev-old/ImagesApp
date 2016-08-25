goog.provide("imageApp.command.IAction");

/** @interface */
imageApp.command.IAction = function() {};

imageApp.command.IAction.prototype.execute = goog.abstractMethod;

imageApp.command.IAction.prototype.unexecute = goog.abstractMethod;
