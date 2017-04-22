var RegisterLicenses = artifacts.require("./RegisterLicenses.sol");

module.exports = function(deployer) {
  deployer.deploy(RegisterLicenses);
};
