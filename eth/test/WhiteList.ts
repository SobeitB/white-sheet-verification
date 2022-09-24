import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("WhiteList", function () {
  async function deployOneYearLockFixture() {
    const [owner, user1, user2, user3] = await ethers.getSigners();

    const WhiteList = await ethers.getContractFactory("WhiteList");
    const wl = await WhiteList.deploy();

    return { wl, owner, user1, user2, user3 };
  }

  describe("Deployment", function () {
    it("verify signature", async function () {
      const { wl, owner, user1, user2, user3 } = await loadFixture(deployOneYearLockFixture);

      const addresses = [
        user1.address,
        user2.address,
        user3.address
      ]

      addresses.forEach(async (account) => {
        const dataHash = ethers.utils.id(account.toLowerCase())
        const messageBytes = ethers.utils.arrayify(dataHash)
        let signature = await owner.signMessage(messageBytes)

        expect(await wl._verify(dataHash, signature)).to.equal(true);
      })

    });
  });
});
