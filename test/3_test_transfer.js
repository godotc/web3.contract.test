const CIVIL3 = artifacts.require("CIVIL3")
const BN = require('bn.js');

contract("CIVIL3", function (accounts) {
	let contract;

	// Overload equal of BN
	BN.prototype.equal = function (other) {
		return this.eq(new BN(other));
	}

	before(async function () {
		contract = await CIVIL3.new("name", "symbol", 12345678, 18, {from: accounts[0]});
	});

	it("transfer token from A to B", async function () {

		// Mint tokens
		await contract.mint(accounts[1], 5000, {from: accounts[0]});
		await contract.mint(accounts[2], 5000, {from: accounts[0]});

		// Get balacne of A,B
		const balanceA = await contract.balanceOf(accounts[1]);
		const balanceB = await contract.balanceOf(accounts[2]);




		assert.equal(balanceA, 5000, "Minted for A not successs");
		assert.equal(balanceB, 5000, "Minted for B not successs");

		// Transfer tokens from A to B
		await contract.transfer(accounts[2], 1000, {from: accounts[1]});

		// Get balances after transfer
		const newBalanceA = await contract.balanceOf(accounts[1]);
		const newBalanceB = await contract.balanceOf(accounts[2]);


		// Assert that balances have been updated correctly
		assert.equal(newBalanceA, 4000, "Balance of A is incorrect");
		assert.equal(newBalanceB, 6000, "Balance of B is incorrect");
	});
})




