var fs = require('fs');
var vm = require('vm');

var chai = require("chai");
expect = chai.expect;
should = chai.should();

chai.use(require("chai-xml"));

//document = require("jsdom").jsdom("");

window = {
	location: {
		search: ""
	},

	documentElement: {
		clientWidth: 0,
		clientHeight: 0
	},

	navigator : {
		msPointerEnabled : false
	}
};

screen = {
	width: 1920,
	height: 1080,
	deviceXDPI: 600,
	logicalXDPI: 600,
	deviceYDPI: 300,
	logicalYDPI: 300
};

var path = './test/unittest.base';
var code = fs.readFileSync(path);
vm.runInThisContext(code, path);
var filePrefixLength = "file:///".length;

goog.writeScriptTag_ = function(src)
{
	goog.dependencies_.written[src] = true;

	path = src.substr(filePrefixLength);
	var code = fs.readFileSync(path);
	vm.runInThisContext(code, path);

	return true;
};