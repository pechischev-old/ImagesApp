goog.provide("command.IAction");

/** @interface */
command.IAction = function() {};
command.IAction.prototype = {

    execute: goog.abstractMethod,

    unexecute: goog.abstractMethod
};