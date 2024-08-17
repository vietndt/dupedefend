// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.16;
/** taken from  polygon sample contract contracts/examples/NonMerklizedIdentityExample.sol*/

import { IState } from "@iden3/contracts/interfaces/IState.sol";
import { ClaimBuilder } from "@iden3/contracts/lib/ClaimBuilder.sol";
import { IdentityLib } from "@iden3/contracts/lib/IdentityLib.sol";
import { IdentityBase } from "@iden3/contracts/lib/IdentityBase.sol";
import { PrimitiveTypeUtils } from "@iden3/contracts/lib/PrimitiveTypeUtils.sol";
import {Ownable2StepUpgradeable} from '@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol';

contract IssuerSimple is IdentityBase, Ownable2StepUpgradeable {
    using IdentityLib for IdentityLib.Data;
    uint256[500] private __gap;
    // represent the current credential type
    string private schemaURL;
    uint256 private schemaHash;
    string private schemaJSON;
    string private credentialType;

    // claimsMapSize was used for revocationNonce
    uint64 private claimsMapSize = 0;
   
    // can represent historical claims
    struct ClaimInfo {
        // metadata
        string schemaURL;
        uint256 schemaHash;
        string schemaJSON;
        string credentialType;
        // data
        uint256[8] claim;
    }

    // credential storage
    mapping(uint256 => mapping(string => ClaimInfo)) private claimsMap;
    event Claimed(uint256 indexed userId, address requestor, string videoOrChannelId);

    function initialize(address _stateContractAddr) public override initializer {
        super.initialize(_stateContractAddr);
        __Ownable_init();
    }
    
    function setClaim(
        uint256 _userId, 
        string memory _uuid,
        uint256[8] memory _claimData
    ) internal {
        claimsMap[_userId][_uuid] = ClaimInfo({
            schemaURL: schemaURL,
            schemaHash: schemaHash,
            schemaJSON: schemaJSON,
            credentialType: credentialType,
            claim: _claimData
        }); 
        claimsMapSize++;
    }
    //TODO:need to change this to be a mapping of address to channel
    function getUserClaim(uint256 _userId, string memory _videoOrChannelId) public view returns (ClaimInfo memory) {
        return claimsMap[_userId][_videoOrChannelId];
    }

    function setSchema(
            string memory _schemaURL, 
            uint256 _schemaHash,
            string memory _schemaJSON,
            string memory _credentialType
        ) public onlyOwner {
        schemaURL = _schemaURL;
        schemaHash = _schemaHash;
        schemaJSON = _schemaJSON;
        credentialType = _credentialType;
    }

    function addClaimAndTransit(uint256[8] memory _claim) internal {
        identity.addClaim(_claim);
        identity.transitState();
    }

    function revokeClaimAndTransit(uint64 _revocationNonce) public onlyOwner {
        identity.revokeClaim(_revocationNonce);
        identity.transitState();
    }

    
    function issueCredential(uint256 _userId, address _requestor, string memory _videoOrChannelId) public {
        ClaimBuilder.ClaimData memory claimData = ClaimBuilder.ClaimData({
             // metadata
            schemaHash: schemaHash,
            idPosition: ClaimBuilder.ID_POSITION_INDEX,
            expirable: true,
            updatable: false,
            merklizedRootPosition: 0,
            version: 0,
            id: _userId,
            revocationNonce: claimsMapSize,
            expirationDate: 3183110232,
            // data
            merklizedRoot: 0,
            indexDataSlotA: convertAddressToUint256(_requestor), // we are saying that in the tree that there can ever be only 1 of 1 address -> 1 video UUID
            indexDataSlotB: stringToUint256(_videoOrChannelId), // A+ B is always unique
            valueDataSlotA: 0, //can be repeated
            valueDataSlotB: 0
        });
        uint256[8] memory claim = ClaimBuilder.build(claimData);
        addClaimAndTransit(claim);
        setClaim(_userId, _videoOrChannelId, claim);
        emit Claimed(_userId, _requestor, _videoOrChannelId);
    }

    function weiToGwei(uint weiAmount) internal pure returns (uint256) {
        return weiAmount / 1e9;
    }

    function convertAddressToUint256(address _addr) internal pure returns (uint256) {
        return uint256(uint160(_addr));
    }

    function stringToUint256(string memory _videoOrChannelId) public pure returns (uint256) {
        bytes memory theBytes = bytes(_videoOrChannelId);
        bytes32 theHash = keccak256(theBytes);
        uint256 theUint256 = uint256(theHash);
        return theUint256;
    }
}