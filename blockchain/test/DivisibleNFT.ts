import { expect } from "chai";
import { ethers } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { DivisibleNFT, MockNFT } from "../typechain-types";
import { BigNumber } from "ethers";

describe("DivisibleNFT", () => {
  let DivisibleNFT, divisibleNFT: DivisibleNFT, owner: SignerWithAddress, addr1: SignerWithAddress, addr2: SignerWithAddress, addrs: SignerWithAddress[];

  let tokenId: BigNumber;

  let amount = 100;
  let uri = "ipfs://Qmtest";

  let MockNFT: MockNFT;

  beforeEach(async () => {
      DivisibleNFT = await ethers.getContractFactory("DivisibleNFT");
      divisibleNFT = await DivisibleNFT.deploy();

      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

      let MockNFTFactory = await ethers.getContractFactory("MockNFT");
      MockNFT = await MockNFTFactory.deploy("MockNFT", "MNFT", "ipfs://");

      await MockNFT.mint(owner.address);

      await MockNFT.approve(divisibleNFT.address, 0);

      await divisibleNFT.wrap(owner.address, ethers.utils.parseUnits("1"), uri, MockNFT.address, 0);

      tokenId = await divisibleNFT.tokenOfOwnerByIndex(owner.address, 0);
  });

  describe("Deployment", () => {
      it("Should set the right owner", async () => {
        expect(await divisibleNFT.ownerOf(tokenId)).to.equal(owner.address);
      });

      it("Should have the correct name and symbol", async () => {});
  });

  describe("Minting", () => {
      it("Should mint a token with the correct URI and amount", async () => {});

      it("Should increment the tokenId counter after minting", async () => {});

      it("Should only allow the owner to mint", async () => {});
  });

  describe("Token Amount", () => {
      it("Should return the correct token amount", async () => {});
  });

  describe("Token URI", () => {
      it("Should return the correct token URI", async () => {});
  });

  describe("Transfer", () => {
      beforeEach(async () => {
          // Mint a token
      });

      it("Should transfer the entire token when the specified amount equals the token amount", async () => {});

      it("Should create a new split token with the specified amount when the specified amount is less than the token amount", async () => {});

      it("Should update the token amount after creating a split token", async () => {});
  
      it("Should revert if the specified transfer amount is too large", async () => {});
  
      it("Should correctly transfer a split token to the recipient", async () => {});
  });
  
  describe("Burn", () => {
      beforeEach(async () => {
          // Mint a token
      });
  
      it("Should burn the token and remove its amount", async () => {});
  
      it("Should revert if a non-owner tries to burn a token", async () => {});
  
      it("Should emit a Transfer event when a token is burned", async () => {});
  });

  describe("Overrides", () => {
    it("Should override the _transfer function to handle divisible tokens", async () => {});
  
    it("Should override the _burn function to handle deleting the token amount", async () => {});
  
    it("Should override the tokenURI function to return the correct token URI", async () => {});
  });
  
  describe("Edge cases and input validation", () => {
    it("Should revert if trying to transfer a non-existent token", async () => {});
  
    it("Should revert if trying to get the amount of a non-existent token", async () => {});
  
    it("Should revert if trying to get the token URI of a non-existent token", async () => {});
  
    it("Should revert if trying to mint a token with an empty URI", async () => {});
  
    it("Should revert if trying to mint a token with an amount of 0", async () => {});
  
    it("Should revert if trying to transfer a token with an amount of 0", async () => {});
  });
});

describe("Integration tests", () => {
  beforeEach(async () => {
      // Setup contract and addresses
  });

  describe("Mint, transfer and burn", () => {
      it("Should mint, transfer and burn a token correctly", async () => {});

      it("Should mint, split, and transfer tokens correctly", async () => {});

      it("Should mint, split, transfer and burn tokens correctly", async () => {});

      it("Should mint multiple tokens, split and transfer them correctly", async () => {});

      it("Should mint multiple tokens, transfer them to multiple recipients, and burn them correctly", async () => {});
  });
});