const CIVIL3 = artifacts.require("CIVIL3")


contract("CIVIL3", function (accounts) {
	let contract;
	const name = "TheName";
	const symbol = "TheToken";
	const initialSupply = 100000;
	const demicals = 18;

	// deploy contract before running tests
	before(async function () {
		contract = await CIVIL3.new(name, symbol, initialSupply, demicals, {from: accounts[0]});
	})

	// Test if is the right name or symbol
	it("has the correct name/symbol", async function(){
		const theName = await contract.name();
		assert.equal(theName,name, "Contract name not the same");

		const theSymbol = await contract.symbol();
		assert.equal(theSymbol,symbol, "Contract symbol not the same");
	})

	// Test inital number and demicals
	it("has the correct number/demicals", async function(){
		const theName = await contract.name();
		assert.equal(theName,name, "Contract name not the same");

		const theSymbol = await contract.symbol();
		assert.equal(theSymbol,symbol, "Contract symbol not the same");
	})
})
