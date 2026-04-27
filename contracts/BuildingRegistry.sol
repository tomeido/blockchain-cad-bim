// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BuildingRegistry {
    struct Building {
        string name;
        string description;
        string ipfsHash; // Hash of the BIM model
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => Building) public buildings;
    uint256 public totalBuildings;

    event BuildingRegistered(uint256 indexed id, address indexed owner, string name, string ipfsHash);

    function registerBuilding(string memory _name, string memory _description, string memory _ipfsHash) public {
        bytes memory ipfsBytes = bytes(_ipfsHash);
        require(ipfsBytes.length > 0, "IPFS hash cannot be empty");

        // Basic validation for common IPFS hash prefixes
        // CIDv0 starts with 'Qm'
        // CIDv1 typically starts with 'bafy'
        bool hasValidPrefix = false;
        if (ipfsBytes.length >= 2 && ipfsBytes[0] == "Q" && ipfsBytes[1] == "m") {
            hasValidPrefix = true;
        } else if (ipfsBytes.length >= 4 && ipfsBytes[0] == "b" && ipfsBytes[1] == "a" && ipfsBytes[2] == "f" && ipfsBytes[3] == "y") {
            hasValidPrefix = true;
        }

        require(hasValidPrefix, "Invalid IPFS hash format");

        totalBuildings++;
        buildings[totalBuildings] = Building({
            name: _name,
            description: _description,
            ipfsHash: _ipfsHash,
            owner: msg.sender,
            timestamp: block.timestamp
        });

        emit BuildingRegistered(totalBuildings, msg.sender, _name, _ipfsHash);
    }

    function getBuilding(uint256 _id) public view returns (Building memory) {
        return buildings[_id];
    }
}
