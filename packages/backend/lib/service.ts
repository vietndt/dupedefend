// import {
//     EthStateStorage,
//     CredentialRequest,
//     CircuitId,
//     IIdentityWallet,
//     ZeroKnowledgeProofRequest,
//     AuthorizationRequestMessage,
//     PROTOCOL_CONSTANTS,
//     AuthHandler,
//     core,
//     CredentialStatusType
//   } from '@0xpolygonid/js-sdk';
  
//   import {
//     initInMemoryDataStorageAndWallets,
//     initCircuitStorage,
//     initProofService,
//     initPackageManager,
//     initMongoDataStorageAndWallets
//   } from './walletSetup';
  
//   import { ethers } from 'ethers';
//   import dotenv from 'dotenv';
//   import { generateRequestData } from './request';
//   dotenv.config();
  
//   const rhsUrl = process.env.RHS_URL as string;
//   const walletKey = process.env.WALLET_KEY as string;
  
//   async function createIdentity(identityWallet: IIdentityWallet) {
//     const { did, credential } = await identityWallet.createIdentity({
//       method: core.DidMethod.Iden3,
//       blockchain: core.Blockchain.Polygon,
//       networkId: core.NetworkId.Mumbai,
//       revocationOpts: {
//         type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
//         id: rhsUrl
//       }
//     });
  
//     return {
//       did,
//       credential
//     };
//   }
  
//   function createKYCAgeCredentialRequest(
//     circuitId: CircuitId,
//     credentialRequest: CredentialRequest
//   ): ZeroKnowledgeProofRequest {
//     const proofReqSig: ZeroKnowledgeProofRequest = {
//       id: 1,
//       circuitId: CircuitId.AtomicQuerySigV2,
//       optional: false,
//       query: {
//         allowedIssuers: ['*'],
//         type: credentialRequest.type,
//         context:
//           'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
//         credentialSubject: {
//           documentType: {
//             $eq: 99
//           }
//         }
//       }
//     };
  
//     const proofReqMtp: ZeroKnowledgeProofRequest = {
//       id: 1,
//       circuitId: CircuitId.AtomicQueryMTPV2,
//       optional: false,
//       query: {
//         allowedIssuers: ['*'],
//         type: credentialRequest.type,
//         context:
//           'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
//         credentialSubject: {
//           birthday: {
//             $lt: 20020101
//           }
//         }
//       }
//     };
  
//     switch (circuitId) {
//       case CircuitId.AtomicQuerySigV2:
//         return proofReqSig;
//       case CircuitId.AtomicQueryMTPV2:
//         return proofReqMtp;
//       default:
//         return proofReqSig;
//     }
//   }

// //here we save the credential request to the chain
// // the frontend will call this function to save the credential 
// export async function issueCredential() {
//     let { dataStorage, credentialWallet, identityWallet } = await initInMemoryDataStorageAndWallets();

//     const circuitStorage = await initCircuitStorage();
//     const proofService = await initProofService(
//       identityWallet,
//       credentialWallet,
//       dataStorage.states,
//       circuitStorage
//     );

//     const { did: issuerDID, credential: issuerAuthBJJCredential } = await createIdentity(
//       identityWallet
//     );
//     const credential = await identityWallet.issueCredential(issuerDID, credentialRequest);
  
//     console.log('===============  credential ===============');
//     console.log(JSON.stringify(credential));
  
//     await dataStorage.credential.saveCredential(credential);
        
//     console.log('================= generate Iden3SparseMerkleTreeProof =======================');

//     const res = await identityWallet.addCredentialsToMerkleTree([credential], issuerDID);

//     console.log('================= push states to rhs ===================');

//     await identityWallet.publishStateToRHS(issuerDID, rhsUrl);

//     console.log('================= publish to blockchain ===================');

//     const ethSigner = new ethers.Wallet(walletKey, (dataStorage.states as EthStateStorage).provider);
//     const txId = await proofService.transitState(
//         issuerDID,
//         res.oldTreeState,
//         true,
//         dataStorage.states,
//         ethSigner
//     );
//     console.log(txId);
//   }

//   exports.issueCredential = issueCredential;
  
