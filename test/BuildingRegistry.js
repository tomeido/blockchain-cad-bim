const { expect } = require("chai");

describe("BuildingRegistry", function () {
  let registry;
  let owner;
  let addr1;

  beforeEach(async function () {
    const BuildingRegistry = await ethers.getContractFactory("BuildingRegistry");
    [owner, addr1] = await ethers.getSigners();
    registry = await BuildingRegistry.deploy();
  });

  describe("registerBuilding", function () {
    it("should successfully register a building with a valid CIDv0 (Qm) IPFS hash", async function () {
      const name = "Building Qm";
      const description = "CIDv0 test";
      const ipfsHash = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"; // Valid format

      await expect(registry.registerBuilding(name, description, ipfsHash))
        .to.emit(registry, "BuildingRegistered")
        .withArgs(1, owner.address, name, ipfsHash);

      const building = await registry.getBuilding(1);
      expect(building.ipfsHash).to.equal(ipfsHash);
    });

    it("should successfully register a building with a valid CIDv1 (bafy) IPFS hash", async function () {
      const name = "Building bafy";
      const description = "CIDv1 test";
      const ipfsHash = "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3dfuylqabf3oclgtqy55fbzdi"; // Valid format

      await expect(registry.registerBuilding(name, description, ipfsHash))
        .to.emit(registry, "BuildingRegistered")
        .withArgs(1, owner.address, name, ipfsHash);

      const building = await registry.getBuilding(1);
      expect(building.ipfsHash).to.equal(ipfsHash);
    });

    it("should revert if the IPFS hash is empty", async function () {
      const name = "Building Empty";
      const description = "Empty hash test";
      const ipfsHash = "";

      await expect(registry.registerBuilding(name, description, ipfsHash))
        .to.be.revertedWith("IPFS hash cannot be empty");
    });

    it("should revert if the IPFS hash has an invalid prefix", async function () {
      const name = "Building Invalid";
      const description = "Invalid prefix test";
      const ipfsHash = "InvalidHashPrefix1234567890";

      await expect(registry.registerBuilding(name, description, ipfsHash))
        .to.be.revertedWith("Invalid IPFS hash format");
    });
  });

  describe("getBuilding", function () {
    it("should return the correct building details after registration", async function () {
      const name = "Building A";
      const description = "A modern office building";
      const ipfsHash = "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco";

      await registry.registerBuilding(name, description, ipfsHash);

      const building = await registry.getBuilding(1);

      expect(building.name).to.equal(name);
      expect(building.description).to.equal(description);
      expect(building.ipfsHash).to.equal(ipfsHash);
      expect(building.owner).to.equal(owner.address);
      expect(building.timestamp).to.be.gt(0);
    });

    it("should return empty values for a non-existent building ID (0)", async function () {
      const building = await registry.getBuilding(0);

      expect(building.name).to.equal("");
      expect(building.owner).to.equal("0x0000000000000000000000000000000000000000");
    });

    it("should return empty values for a non-existent building ID (out of bounds)", async function () {
      const building = await registry.getBuilding(99);

      expect(building.name).to.equal("");
      expect(building.description).to.equal("");
      expect(building.ipfsHash).to.equal("");
      expect(building.owner).to.equal("0x0000000000000000000000000000000000000000");
      expect(building.timestamp).to.equal(0);
    });

    it("should distinguish between different registered buildings", async function () {
      await registry.registerBuilding("B1", "D1", "Qm11111111111111111111111111111111111111111111");
      await registry.registerBuilding("B2", "D2", "Qm22222222222222222222222222222222222222222222");

      const b1 = await registry.getBuilding(1);
      const b2 = await registry.getBuilding(2);

      expect(b1.name).to.equal("B1");
      expect(b2.name).to.equal("B2");
      expect(await registry.totalBuildings()).to.equal(2);
    });
  });
});
