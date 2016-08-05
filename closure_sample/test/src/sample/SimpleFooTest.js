goog.require("ispring.sample.SimpleFoo");

describe("sample.SimpleFoo", function () {
	var SimpleFoo = ispring.sample.SimpleFoo;

	it("constructor", function() {
		var simpleFoo = new SimpleFoo();
		expect(simpleFoo._param).to.be.equal("123");
	});
});