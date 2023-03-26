import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20 } from "../typechain";

describe("MyERC20Contract", function () {
  let MyERC20Contract: ERC20;
  let someAddress: SignerWithAddress;
  let someOtherAddress: SignerWithAddress;


  beforeEach(async function () {
    const ERC20ContractFactory = await ethers.getContractFactory("ERC20"):
    const MyERC20Contract = await ERC20ContractFactory.deploy("hell", "SYM"):
    await MyERC20Contract.deployed();

    someAddress = (await ethers.getSigners())[1];
    someOtherAddress = (await ethers.getSigners())[2];
  });

  describe("When i hold 10 tokens", function() {
    beforeEach(async function () {
      await MyERC20Contract.transfer(someAddress.address, 10);
    });

    describe("when i transfer 10 tokens", function(){
      it("should send tokens correctly", async function () {
        await MyERC20Contract
        .connect(someAddress)
        .transfer(someOtherAddress.address, 10);

        expect(await MyERC20Contract.balanceOf(someOtherAddress.address))
        .to.equal(10);
      });
    });

    describe("when i transfer 15 tokens", function () {
        it("should revert the transaction", async function () {
            await expect(MyERC20Contract
        .connect(someAddress)
        .transfer(someOtherAddress.address, 15))
        .to.be.revertedWith("ERC20: transfer amount exceeds balance");

        });
    });
  });
});