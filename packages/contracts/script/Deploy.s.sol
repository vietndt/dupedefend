// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.2 <0.9.0;
import "forge-std/Script.sol";
// import { IssuerSimple } from "../src/IssuerSimple.sol";
import { SocialMediaVerifier } from "../src/SocialMediaVerifier.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Deploy is Script  {
    function run() public  {
        uint256 broadcaster = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(broadcaster);

        // IssuerSimple issuer = new IssuerSimple();
        // issuer.initialize(0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124);
        SocialMediaVerifier verifier = new SocialMediaVerifier(0xC22a79eBA640940ABB6dF0f7982cc119578E11De);
        // verifier.setIssuer(issuer);
        verifier.setIssuerSimpleAddress(0x454E5108cEE33c743D8DE8eF92aeb749256AbC3D);
        //add verifier into the chainlink subscription
        //then trigger the issuance
        vm.stopBroadcast();
    }
}
