goog.provide("command.IHistory");
goog.provide("command.IHistoryViewDelegate");


/**
 * @interface
 */
command.IHistory = function() {};
/**
 * @param action
 */
command.IHistory.prototype.recordAction =  goog.abstractMethod;


/**
 * @interface
 */
command.IHistoryViewDelegate = function() {};
command.IHistoryViewDelegate.prototype = {
	
	undo: goog.abstractMethod,
	
	redo: goog.abstractMethod
};
