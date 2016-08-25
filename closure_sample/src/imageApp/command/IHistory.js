goog.provide("imageApp.command.IHistory");
goog.provide("imageApp.command.IHistoryViewDelegate");


/**
 * @interface
 */
imageApp.command.IHistory = function() {};
/**
 * @param action
 */
imageApp.command.IHistory.prototype.recordAction =  goog.abstractMethod;


/**
 * @interface
 */
imageApp.command.IHistoryViewDelegate = function() {};
imageApp.command.IHistoryViewDelegate.prototype = {
	
	undo: goog.abstractMethod,
	
	redo: goog.abstractMethod
};
