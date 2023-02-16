const CIVIL3 = artifacts.require("CIVIL3")

module.exports = function(deployer){
	deployer.deploy(CIVIL3,"CIVIL3", "CIVIL",50, 18);
};
