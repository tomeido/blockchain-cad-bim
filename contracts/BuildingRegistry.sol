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
