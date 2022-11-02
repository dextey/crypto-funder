const { networkConfig } = require("../helper.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId;

  let priceFeedAddress;

  if (developmentChains.includes(network.name)) {
    const mockV3Aggregator = await deployments.get("MockV3Aggregator");
    priceFeedAddress = mockV3Aggregator.address;
  } else {
    priceFeedAddress = networkConfig[chainId]["priceFeedAddress"];
  }

  console.log("Deploying FundMe");
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [priceFeedAddress],
    log: true,
  });
  console.log("====================================");
};

module.exports.tags = ["all", "fundMe"];
