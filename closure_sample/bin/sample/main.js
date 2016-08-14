goog.provide("Sample");

goog.require("AppController");
goog.require("AppModel");
/**
 * @export
 */
Sample.start = function()
{
	var model = new AppModel();
	var idTimer = setInterval(function() {
		model.outputLog();
	}, 40);
	var controller = new AppController(model);
};

