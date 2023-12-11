## Introduction

<div style="text-align:center;">
    <img src="./FlowDefend.png" alt="Alt Text" width="95%">
</div>


A project to create an automatic polygon issuer using chainlink functions and account abstraction. This allows 
creators to protect their content without having to go through a complicated process each time they publish new content.

This was done for the constellation chainlink hackathon


## Installation
1. Use yarn and install inside each of the sub packages
2. use forge for the contracts folder


### Changelog
- [x] Add chainlink function to get youtube metadata and check if user's DID and wallet address exists in video
- [x] Added polygon's onchain issuer addresses - 0x454E5108cEE33c743D8DE8eF92aeb749256AbC3D
- [x] Added web3auth for easy onboarding for content creators as subject audience
- [x] Added chainlink function caller - 0xdc99eE47fc88C11Cdff1291628d1c0b5D6292706 
- [x] Added UI to show verification and past verifications
- [x] Added Account Abstraction using Alchemy's Light account and reconfigured the hierarchy of accounts as web3auth-> LightAccount -> DID


### Example Transaction with Claim for polygon that was fulfilled via a chainlink state change
https://mumbai.polygonscan.com/tx/0x7ed386efe1d6a3e27e1fdc7982b40d05018f13d7aa915fb3716f73aa5861c6b3#eventlog
https://mumbai.polygonscan.com/tx/0xe7d5e51f03de548ce64a77ee2b4bed48beb76dce6f219ce4d4da895b6cb1239c#eventlog

### Example Transaction with Claim that was incorrect with someone else credential which should fail 
https://mumbai.polygonscan.com/tx/0x91a2c9c37e12c3ce87f2a8b0dde19a064679db94fe493c373ecc2f4d9b9bec4b#eventlog
NOTE: The response from chainlink is not verified and so we do not issue credential

### Steps
User calls below contract via frontend (we hardcode youtube api key for testing)
1. SocialMediaVerifier.sol -> SendRequest -> SendRequest to chainlink to call youtube api.

We write in Source.js to get the data from youtube description eg. useraddress for a Video

2. chainlink -> SocialMediaVerifier.sol -> fullfillrequest
// Create a mapping between request id and user address
// check if the response has address and it matches the user address

3. fullfillrequest -> issueCredential in IssuerSimple.sol (polygon Template for Verifiable credential)
// Issue a credential to the user
