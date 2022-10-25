module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mockV3Aggregator = await deployments.get("MockV3Aggregator");
  const priceFeedAddress = mockV3Aggregator.address;

  console.log("Deploying FundMe");
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [priceFeedAddress],
    log: true,
  });
  console.log("====================================");
};

module.exports.tags = ["all", "fundMe"];
