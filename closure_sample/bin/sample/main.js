goog.provide("Sample");

//goog.require("Application");

goog.require("AppController");
goog.require("AppModel");
/**
 * @export
 */
Sample.start = function()
{
	var model = new AppModel();
	//var app = new Application(model);
	//app.run();
	
	var controller = new AppController(model);
	/*var idTimer = setInterval(function() {
		controller.eventLoop();
	}, 100);*/
	controller.eventLoop();
};

