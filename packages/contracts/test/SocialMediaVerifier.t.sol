// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import { PRBTest } from "@prb/test/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";
import { SocialMediaVerifier } from "../src/SocialMediaVerifier.sol";
import {BytesLib} from "solidity-bytes-utils/contracts/BytesLib.sol";

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract SocialMediaVerifierTest is PRBTest, StdCheats {
    using BytesLib for bytes;
    SocialMediaVerifier private verifier;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        // Instantiate the contract-under-test.
        // verifier = SocialMediaVerifier(0xbB26460Bd58AB5EA3917976188fF1260cDA21197);
    }
    
    /// @dev Basic test. Run it with `forge test -vvv` to see the console log.
    function test_Existence() external {
        // console2.log("Test Requestor Existence");
        // bytes32 requestID = 0xd78d1f00b277714e1592ad5075dee021130f3ca6aa9247377fa60a68cf8ac1ed;
        // address requestor = verifier.requestToUser(requestID);
        // console2.log("requestor", requestor);
        // assert(requestor != address(0));
        bytes memory response = hex"307832396435616231323832656536306439624533353244363235613635423466303933396134366131";
        (address requestorFromResponse, uint256 channelID) =  extractAddressAndChannel(response);        
        console2.log("requestorFromResponse", requestorFromResponse);
        console2.log("channelID", channelID);
    }

    function extractAddressAndChannel(bytes memory response) private pure returns (address addr, uint256 channelID) {
        require(response.length >= 20, "Response has an invalid length");

        // Extract the address
        bytes memory addrBytes = bytesToBytes32(response);
        addr = BytesLib.toAddress(addrBytes,2);
        channelID = 0;
        // Extract the channel id into uint
        // channelID = BytesLib.toUint256(response, 20);
        
    }
    function bytesToBytes32(bytes memory b) private pure returns (bytes32 out) {
    uint256 maxLen = 32;
    if (b.length < 32) {
      maxLen = b.length;
    }
    for (uint256 i = 0; i < maxLen; ++i) {
      out |= bytes32(b[i]) >> (i * 8);
    }
    return out;
  }
}





//     /// @dev Fuzz test that provides random values for an unsigned integer, but which rejects zero as an input.
//     /// If you need more sophisticated input validation, you should use the `bound` utility instead.
//     /// See https://twitter.com/PaulRBerg/status/1622558791685242880
//     function testFuzz_Example(uint256 x) external {
//         vm.assume(x != 0); // or x = bound(x, 1, 100)
//         assertEq(foo.id(x), x, "value mismatch");
//     }

//     /// @dev Fork test that runs against an Ethereum Mainnet fork. For this to work, you need to set `API_KEY_ALCHEMY`
//     /// in your environment You can get an API key for free at https://alchemy.com.
//     function testFork_Example() external {
//         // Silently pass this test if there is no API key.
//         string memory alchemyApiKey = vm.envOr("API_KEY_ALCHEMY", string(""));
//         if (bytes(alchemyApiKey).length == 0) {
//             return;
//         }

//         // Otherwise, run the test against the mainnet fork.
//         vm.createSelectFork({ urlOrAlias: "mainnet", blockNumber: 16_428_000 });
//         address usdc = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
//         address holder = 0x7713974908Be4BEd47172370115e8b1219F4A5f0;
//         uint256 actualBalance = IERC20(usdc).balanceOf(holder);
//         uint256 expectedBalance = 196_307_713.810457e6;
//         assertEq(actualBalance, expectedBalance);
//     }
// }