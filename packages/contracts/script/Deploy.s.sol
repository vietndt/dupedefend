// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;
import "forge-std/Script.sol";
import { IssuerSimple } from "../src/IssuerSimple.sol";
// import { SocialMediaVerifier } from "../src/SocialMediaVerifier.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Deploy is Script  {
    function run() public  {
        uint256 broadcaster = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(broadcaster);

        IssuerSimple issuer = new IssuerSimple();
        issuer.initialize(0x134B1BE34911E39A8397ec6289782989729807a4);
        // SocialMediaVerifier verifier = new SocialMediaVerifier(0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C);
        // verifier.setIssuer(issuer);
        //add verifier into the chainlink subscription
        //then trigger the issuance
        vm.stopBroadcast();
    }
}
