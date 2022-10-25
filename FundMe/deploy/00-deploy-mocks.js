const { network } = require("hardhat");
const { developmentChains } = require("../helper.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();

  const { deploy } = deployments;

  if (developmentChains.includes(network.name)) {
    console.log("Network localhost detected - Deploying mocks");
    console.log("====================================");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: "true",
      args: [8, 200000000000],
    });
    console.log("====================================");
  }
};

module.exports.tags = ["all", "mocks"];
