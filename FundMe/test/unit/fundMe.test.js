const { getNamedAccounts, deployments, ethers } = require("hardhat");

const { assert, expect } = require("chai");

describe("FundMe", () => {
  let fundMe;
  let mockV3Aggregator;
  let deployer;
  const ethAmount = ethers.utils.parseEther("1");
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("Constructor", () => {
    it("Aggregator priceFeedAddress is set successfully", async () => {
      const priceFeed = await fundMe.priceFeed();
      assert.equal(priceFeed, mockV3Aggregator.address);
    });
  });

  describe("Fund", () => {
    beforeEach(async () => {
      await fundMe.fund({ value: ethAmount });
    });

    it("Able to fund ethers and store Address in mappings", async () => {
      const value = await fundMe.fundedByAddress(deployer);
      assert.equal(value.toString(), ethAmount);
    });

    it("No duplicate funders", async () => {
      await fundMe.fund({ value: ethAmount });
      await fundMe.fund({ value: ethAmount });
      const funders = await fundMe.getFunders();
      assert.equal(funders.length, 1);
    });
  });

  describe("Withdraw", () => {
    beforeEach(async () => {
      await fundMe.fund({ value: ethAmount });
    });

    it("Only owner can withdraw", async () => {
      const accounts = await ethers.getSigners();
      const attacker = accounts[2];

      const attackerContract = await fundMe.connect(attacker);
      await expect(attackerContract.withDraw()).to.be.revertedWith(
        "FundMe_error"
      );
    });

    it("Able to withdraw funds", async () => {
      const deployerBalance = await fundMe.provider.getBalance(deployer);
      const contractBalance = await fundMe.provider.getBalance(fundMe.address);

      const transactionResponse = await fundMe.withDraw();
      const transactionReceipt = await transactionResponse.wait(1);

      const { gasUsed, effectiveGasPrice } = transactionReceipt;
      const gasPrice = gasUsed.mul(effectiveGasPrice);

      const afterDeployerBalance = await fundMe.provider.getBalance(deployer);
      const afterContractBalance = await fundMe.provider.getBalance(
        fundMe.address
      );

      assert.equal(afterContractBalance.toString(), "0");
      assert.equal(
        deployerBalance.add(contractBalance).toString(),
        afterDeployerBalance.add(gasPrice).toString()
      );
    });
  });
});
