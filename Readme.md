## Introduction

A project to create an automatic polygon issuer using chainlink functions and account abstraction. This allows 
creators to protect their content without having to go through a complicated process each time they publish new content.

This was done for the constellation chainlink hackathon

### Changelog
- [x] Created a basic UI to get youtube metadata
- [x] Add a sample template from polygon id (this was renamed to backend - curl https://iden3-circuits-bucket.s3.eu-west-1.amazonaws.com/latest.zip --output latest.zip)
- [ ] Deploy on server
- [ ] Tweak polygon sample project to emit VC's
- [ ] Tweak sample to emit VC's using AA
- [ ] Allow authorization via the UI
- [ ] Expose a simple explorer and view my own profile page
- [ ] Allow for revoking a VC

### Issues to resolve
Not able to add credentialAtomicQueryMTPV2OnChain from polygon sample due to large file size need to check