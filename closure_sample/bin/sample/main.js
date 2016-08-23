goog.provide("Sample");

goog.require("AppController");
goog.require("AppModel");
/**
 * @export
 */
Sample.start = function()
{
	var model = new AppModel();
	var controller = new AppController(model);
	var idTimer = setInterval(function() {
		//model.outputLog();
	}, 0);

};

