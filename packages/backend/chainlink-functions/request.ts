import { SubscriptionManager, simulateScript, ResponseListener, ReturnType, decodeResult, FulfillmentCode, SecretsManager } from "@chainlink/functions-toolkit";
import { ethers } from "ethers";
import * as envvar from "@chainlink/env-enc";
envvar.config();

import functionsConsumerAbi from './abi/functionsClient.json';
import { youtubeFunctionString } from './functions/youtube';

const consumerAddress = "0xE54C1690Ee523c827C97376d42cd35BeA01de226";
const subscriptionId = 846; // REPLACE this with your subscription ID

// hardcoded for Polygon Mumbai
const makeRequest = async (videoOrChannelId: string, ownerWalletAddress: string, type: string): Promise<any> => {
  return new Promise(async (resolve, rej) => {
    // hardcoded for Polygon Amoy
    const routerAddress = "0xC22a79eBA640940ABB6dF0f7982cc119578E11De";
    const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    const donId = "fun-polygon-mumbai-1";
    const explorerUrl = "https://mumbai.polygonscan.com";
    const gatewayUrls = [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ];
    // Initialize functions settings
    const source = youtubeFunctionString;
  
    const args = [videoOrChannelId, ownerWalletAddress, type];
    const secrets: any = { apiKey: process.env.YOUTUBE_API_KEY };
    const slotIdNumber = 0; // slot ID where to upload the secrets
    const expirationTimeMinutes = 15; // expiration time in minutes of the secrets
    const gasLimit = 300000;
  
    // Initialize ethers signer and provider to interact with the contracts onchain
    const privateKey: any = process.env.PRIVATE_KEY;
    if (!privateKey) {
      rej("private key not provided - check your environment variables")
    }
  
    const rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL;
    if (!rpcUrl) {
      rej('rpcUrl not provided  - check your environment variables')
    }
  
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider); // create ethers signer for signing transactions
  

    //////// MAKE REQUEST ////////
  
    // First encrypt secrets and upload the encrypted secrets to the DON
    const secretsManager = new SecretsManager({
      signer: signer,
      functionsRouterAddress: routerAddress,
      donId: donId,
    });
    await secretsManager.initialize();
  
    // Encrypt secrets and upload to DON
    const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);
  
  
    console.log(
      `Upload encrypted secret to gateways ${gatewayUrls}. slotId ${slotIdNumber}. Expiration in minutes: ${expirationTimeMinutes}`
    );
    
    // Upload secrets
    const uploadResult: any = await secretsManager.uploadEncryptedSecretsToDON({
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
      gatewayUrls: gatewayUrls,
      slotId: slotIdNumber,
      minutesUntilExpiration: expirationTimeMinutes,
    });
  
    if (!uploadResult.success) {
      rej(`Encrypted secrets not uploaded to ${gatewayUrls}`)
    }
  
    console.log(
      `\n✅ Secrets uploaded properly to gateways ${gatewayUrls}! Gateways response: `,
      uploadResult
    );
    
    const donHostedSecretsVersion = parseInt(uploadResult.version); // fetch the reference of the encrypted secrets

 
    return resolve(donHostedSecretsVersion);
     
  })
};

export default makeRequest; 