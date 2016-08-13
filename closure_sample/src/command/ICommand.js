goog.provide("command.ICommand");

/** @interface */
command.ICommand = function() {};
command.ICommand.prototype = {

    execute: goog.abstractMethod,

    undo: goog.abstractMethod
};