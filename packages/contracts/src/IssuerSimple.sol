// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.16;
/** taken from  polygon sample contract contracts/examples/NonMerklizedIdentityExample.sol*/

import { IState } from "@iden3/contracts/interfaces/IState.sol";
import { ClaimBuilder } from "@iden3/contracts/lib/ClaimBuilder.sol";
import { IdentityLib } from "@iden3/contracts/lib/IdentityLib.sol";
import { IdentityBase } from "@iden3/contracts/lib/IdentityBase.sol";
import { PrimitiveTypeUtils } from "@iden3/contracts/lib/PrimitiveTypeUtils.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract IssuerSimple is IdentityBase, OwnableUpgradeable {
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
    mapping(uint256 => mapping(address => ClaimInfo)) private claimsMap;
    event Claimed(address requestor, uint256 channelID);

    function initialize(address _stateContractAddr) public override initializer {
        super.initialize(_stateContractAddr);
        __Ownable_init();
    }
    
    function setClaim(
        address _uuid,
        uint256 _id
    ) internal {
        claimsMap[_id][_uuid] = ClaimInfo({
            schemaURL: schemaURL,
            schemaHash: schemaHash,
            schemaJSON: schemaJSON,
            credentialType: credentialType,
            claim: [_id, 0, 0, 0, 0, 0, 0, 0]
        }); 
        claimsMapSize++;
    }
    //TODO:need to change this to be a mapping of address to channel
    function getUserClaim(uint256 _userId, address _uuid) public view returns (ClaimInfo memory) {
        return claimsMap[_userId][_uuid];
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

    // we just call this directly from the chainlink fullfillment and see if it works
    function issueCredential(uint256 _channelId, address requestor) public {
        ClaimBuilder.ClaimData memory claimData = ClaimBuilder.ClaimData({
             // metadata
            schemaHash: schemaHash,
            idPosition: ClaimBuilder.ID_POSITION_INDEX,
            expirable: true,
            updatable: false,
            merklizedRootPosition: 0,
            version: 0,
            id: convertAddressToUint256(requestor),
            revocationNonce: claimsMapSize,
            expirationDate: 3183110232,
            // data
            merklizedRoot: 0,
            indexDataSlotA: convertAddressToUint256(msg.sender),
            indexDataSlotB: _channelId,//later convert this to the users channel id for now just coded to 1
            valueDataSlotA: 0,
            valueDataSlotB: 0
        });
        uint256[8] memory claim = ClaimBuilder.build(claimData);
        addClaimAndTransit(claim);
        setClaim(requestor, _channelId); //1 to denote true
        emit Claimed(requestor, _channelId);
    }

    function weiToGwei(uint weiAmount) internal pure returns (uint256) {
        return weiAmount / 1e9;
    }

    function convertAddressToUint256(address _addr) internal pure returns (uint256) {
        return uint256(uint160(_addr));
    }
}