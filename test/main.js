var create = urlify.create
describe('main', function() {

	it("create", function() {
		expect(create).to.be.a("function")
		expect(create()).to.be.a("function")
	});

	it("sz", function() {
		expect(create()("ß")).to.be("ss");

		expect(create({szToSs:true})("ß")).to.be("ss");
		expect(create({szToSs:false})("ß", {szToSs:true})).to.be("ss");
		expect(create()("ß", {szToSs:true})).to.be("ss");
		expect(create({})("ß", {szToSs:true})).to.be("ss");

		expect(create({szToSs:false})("ß")).to.be("sz");
		expect(create({szToSs:true})("ß", {szToSs:false})).to.be("sz");
		expect(create()("ß", {szToSs:false})).to.be("sz");
		expect(create({})("ß", {szToSs:false})).to.be("sz");

		expect(create({szToSs:false})("aßa")).to.be("asza");
		expect(create({szToSs:true})("aßa")).to.be("assa");

	});

	it("umlauts", function() {

		expect(create()("ÄËÏÖÜäëïöü")).to.be("AEIOUaeiou")

		expect(create({addEToUmlauts:false})("ÄËÏÖÜäëïöü")).to.be("AEIOUaeiou");
		expect(create({addEToUmlauts:true})("ÄËÏÖÜäëïöü", {addEToUmlauts:false})).to.be("AEIOUaeiou");
		expect(create()("ÄËÏÖÜäëïöü", {addEToUmlauts:false})).to.be("AEIOUaeiou");
		expect(create({})("ÄËÏÖÜäëïöü", {addEToUmlauts:false})).to.be("AEIOUaeiou");

		expect(create({addEToUmlauts:true})("ÄËÏÖÜäëïöü")).to.be("AeEIOeUeaeeioeue");
		expect(create({addEToUmlauts:false})("ÄËÏÖÜäëïöü", {addEToUmlauts:true})).to.be("AeEIOeUeaeeioeue");
		expect(create()("ÄËÏÖÜäëïöü", {addEToUmlauts:true})).to.be("AeEIOeUeaeeioeue");
		expect(create({})("ÄËÏÖÜäëïöü", {addEToUmlauts:true})).to.be("AeEIOeUeaeeioeue");
	});

	it("spaces", function() {
		expect(create()("foo bar")).to.be("foo_bar")
		expect(create()("foo  bar")).to.be("foo__bar")
		expect(create()(" foo bar ")).to.be("_foo_bar_")

		expect(create({spaces:"-"})("foo bar")).to.be("foo-bar")
		expect(create()("foo bar",{spaces:"/.*("})).to.be("foo/.*(bar")

	});

	it("toLower", function() {
		expect(create()("HeLlO")).to.be("HeLlO")
		expect(create({toLower:true})("HeLlO")).to.be("hello")

	});

	it("failureOutput", function() {
		expect(create()("")).to.be("")
		expect(create({trim:true})("!@#$")).to.be("non-printable")
		expect(create({trim:true,failureOutput:false})("!@#$")).to.be(false)
		expect(create({trim:true,failureOutput:"something-else-to-say"})("!@#$")).to.be("something-else-to-say")

	});

	it("nonPrintable", function() {
		expect(create()("***")).to.be("___")

		expect(create({nonPrintable:"-"})("**⇔")).to.be("---")
		expect(create()("*",{nonPrintable:"/.*("})).to.be("/.*(")

	});

	it("extendString", function() {
		create();
		expect("".urlify).to.be(undefined);

		create()("", {extendString:true})
		expect("".urlify).to.be(undefined);

		create({extendString:true});
		expect("".urlify).to.be.a('function');

	});

	it("trim", function() {
		expect(create()("foo bar")).to.be("foo_bar")
		expect(create()("foo  bar")).to.be("foo__bar")
		expect(create()(" foo bar ")).to.be("_foo_bar_")

		expect(create({trim:false})("foo bar")).to.be("foo_bar")
		expect(create({trim:false})("foo  bar")).to.be("foo__bar")
		expect(create({trim:false})(" foo bar ")).to.be("_foo_bar_")

		expect(create({trim:false})("foo bar")).to.be("foo_bar")
		expect(create({trim:true})("foo bar", {trim:false})).to.be("foo_bar")
		expect(create({trim:false})("foo  bar")).to.be("foo__bar")
		expect(create({trim:true})("foo  bar", {trim:false})).to.be("foo__bar")
		expect(create({trim:false})(" foo bar ")).to.be("_foo_bar_")
		expect(create({trim:true})(" foo bar ", {trim:false})).to.be("_foo_bar_")

		expect(create({trim:true})("foo bar")).to.be("foo_bar")
		expect(create({trim:false})("foo bar", {trim:true})).to.be("foo_bar")
		expect(create({trim:true})("foo  bar")).to.be("foo_bar")
		expect(create({trim:false})("foo  bar", {trim:true})).to.be("foo_bar")
		expect(create({trim:true})(" foo bar ")).to.be("foo_bar")
		expect(create({trim:false})(" foo bar ", {trim:true})).to.be("foo_bar")

	});

	it("async", function(done) {
		create({trim:false})("foo bar", function(url) {
			expect(url).to.be("foo_bar");
			done();
		});
	});
});
