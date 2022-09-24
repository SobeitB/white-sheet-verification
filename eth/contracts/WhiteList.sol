// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract WhiteList {
    using ECDSA for bytes32;

    address ownerSigner;

    constructor() {
        ownerSigner = msg.sender;
    }

    function _verify(bytes32 data, bytes memory signature) view public returns (bool) {
        bytes32 messageDigest = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                data
            )
        );

        return messageDigest
        .recover(signature) == ownerSigner;
    }

//    function mint(bytes32 data, bytes memory signature) external {
//        // logic ...
//        _verify(data, signature);
//        // logic ...
//    }
}
