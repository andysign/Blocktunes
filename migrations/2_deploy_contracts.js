module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.autolink();
  // deployer.deploy(MetaCoin);
  deployer.deploy(Ownable);
  deployer.autolink();
  deployer.deploy(RegisterLicenses);
};
