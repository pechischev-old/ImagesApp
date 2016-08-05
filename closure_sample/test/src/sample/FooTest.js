goog.require("ispring.sample.Foo");

describe("sample.Foo", function () {
	var Foo = ispring.sample.Foo;

	it("#updateValue", function() {
		var foo = new Foo();
		foo.updateValue("Hello");
		expect(foo._param).to.be.equal("Hello");
	});
});