CIVIL3 = artifacts.require("CIVIL3");

contract("CIVIL3", function (accounts) {
	let contract;

	before(async function () {
		contract = await CIVIL3.new("name", "symbol", 12345678, 18, {from: accounts[0]});
	});

	it("mint tokens for a specific address", async function () {
		// Get the balance of the address before minting
		const balance = await contract.balanceOf(accounts[1]);

		// Mint tokens for the address
		await contract.mint(accounts[1], 100, {from: accounts[0]});

		// Get the balance of the address after minting
		const newBalance = await contract.balanceOf(accounts[1]);

		// Assert that the balance has been updated correctly
		assert.equal(newBalance.toNumber(), balance + 100, "Balance is incorrect");
	});

});
