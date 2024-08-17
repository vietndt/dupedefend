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

New Amoy Addresses - 

SocialMediaVerifier - 0x6f7a9b9EAb67474F52EC9A919b72d0142B49e835
IssuerSimple - 0x454E5108cEE33c743D8DE8eF92aeb749256AbC3D

### Steps
User calls below contract via frontend (we hardcode youtube api key for testing)
1. SocialMediaVerifier.sol -> SendRequest -> SendRequest to chainlink to call youtube api.

We write in Source.js to get the data from youtube description eg. useraddress for a Video

2. chainlink -> SocialMediaVerifier.sol -> fullfillrequest
// Create a mapping between request id and user address
// check if the response has address and it matches the user address

3. fullfillrequest -> issueCredential in IssuerSimple.sol (polygon Template for Verifiable credential)
// Issue a credential to the user
