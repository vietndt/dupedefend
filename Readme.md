## Introduction

<div style="text-align:center;">
    <img src="./FlowDefend.png" alt="Alt Text" width="65%">
</div>


A project to create an automatic polygon issuer using chainlink functions and account abstraction. This allows 
creators to protect their content without having to go through a complicated process each time they publish new content.

This was done for the constellation chainlink hackathon


## Installation

Backend
1. goto backend folder and run ./dl_circuits.sh
2. run npm start

Contracts
cd packages/contracts
forge install
forge build

### Changelog
- [x] Created a basic UI to get youtube metadata
- [x] Add a sample template from polygon id (this was renamed to backend - curl https://iden3-circuits-bucket.s3.eu-west-1.amazonaws.com/latest.zip --output latest.zip)
- [x] Tweak polygon sample project to emit VC's
- [ ] Tweak sample to emit VC's using AA
- [ ] Allow authorization via the UI
- [ ] Expose a simple explorer and view my own profile page
- [ ] Allow for revoking a VC
- [ ] Create a scehma a video credential

### Issues to resolve
Not able to add credentialAtomicQueryMTPV2OnChain from polygon sample due to large file size need to check - Not critical, because we are now shifting to fully onchain issuer.

### Schema's used 
1. Prove ownership of account, existing schema - https://schema-builder.polygonid.me/schemas/5f67feb5-5210-4e6d-9f49-ded962501b1b
2. Need to create credential for a particular media, so that it can be chained


### Steps
User calls below contract via frontend (we hardcode youtube api key for testing)
1. SocialMediaVerifier.sol -> SendRequest -> SendRequest to chainlink to call youtube api.

We write in Source.js to get the data from youtube description eg. useraddress for a Video

2. chainlink -> SocialMediaVerifier.sol -> fullfillrequest
// Create a mapping between request id and user address
// check if the response has address and it matches the user address

3. fullfillrequest -> issueCredential in IssuerSimple.sol (polygon Template for Verifiable credential)
// Issue a credential to the user