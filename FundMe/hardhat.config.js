/** @type import('hardhat/config').HardhatUserConfig */

require("hardhat-deploy");

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.17" }, { version: "0.6.6" }],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
};
