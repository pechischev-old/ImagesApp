goog.provide("Sample");

goog.require("imageApp.AppController");
goog.require("imageApp.AppModel");
/**
 * @export
 */
Sample.start = function()
{
	var model = new imageApp.AppModel();
	var controller = new imageApp.AppController(model);
	var idTimer = setInterval(function() {
		model.outputLog();
	}, 0);

};

