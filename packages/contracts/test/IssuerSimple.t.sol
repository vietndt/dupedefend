// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import { PRBTest } from "@prb/test/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";
import { IssuerSimple } from "../src/IssuerSimple.sol";

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract IssuerSimpleTest is PRBTest, StdCheats {
    IssuerSimple private issuer;
    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        // Instantiate the contract-under-test.
        //  issuer = new IssuerSimple();
        //  issuer.initialize(0x134B1BE34911E39A8397ec6289782989729807a4);
        issuer = IssuerSimple(0x454E5108cEE33c743D8DE8eF92aeb749256AbC3D);
    }
    
    // /// @dev Basic test. Run it with `forge test -vvv` to see the console log.
    function test_Issuance() external {
        console2.log("Test Issuance");
        // uint256 _channelId = 1;
        // uint bal = address(0x29d5ab1282ee60d9bE352D625a65B4f0939a46a1).balance;
        // console2.log("Balance", bal);
        // address requestor = address(0x29d5ab1282ee60d9bE352D625a65B4f0939a46a1);
        uint256 _userId = 24308703216449665528637752374872361740983978940004854943937687158795473409;
        string memory _videoOrChannelId = "UC4nRmZan1X84wnWiW297rTg";
        
        IssuerSimple.ClaimInfo memory cf = issuer.getUserClaim(_userId, _videoOrChannelId);
        // console2.log(cf.claim);

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
