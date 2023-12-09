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
    // hardcoded for Polygon Mumbai
    const routerAddress = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
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
  
    ///////// START SIMULATION ////////////
  
    console.log("Start simulation...", secrets);
  
    const response: any = await simulateScript({
      source: source,
      args: args,
      bytesArgs: [], // bytesArgs - arguments can be encoded off-chain to bytes.
      secrets: secrets, // no secrets in this example
    });
  
    console.log("Simulation result", response);
    const errorString = response.errorString;
    if (errorString) {
      console.log(`❌ Error during simulation: `, errorString);
    } else {
      const returnType = ReturnType.string;
      const responseBytesHexstring = response.responseBytesHexstring;
      if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
        const decodedResponse = decodeResult(
          response.responseBytesHexstring,
          returnType
        );
        console.log(`✅ Decoded response to ${returnType}: `, decodedResponse);
      }
    }
  
    //////// ESTIMATE REQUEST COSTS ////////
    console.log("\nEstimate request costs...");
    // Initialize and return SubscriptionManager
    const subscriptionManager = new SubscriptionManager({
      signer: signer,
      linkTokenAddress: linkTokenAddress,
      functionsRouterAddress: routerAddress,
    });
    await subscriptionManager.initialize();
  
    // estimate costs in Juels
  
    const gasPriceWei: any = await signer.getGasPrice(); // get gasPrice in wei
  
    const estimatedCostInJuels =
      await subscriptionManager.estimateFunctionsRequestCost({
        donId: donId, // ID of the DON to which the Functions request will be sent
        subscriptionId: subscriptionId, // Subscription ID
        callbackGasLimit: gasLimit, // Total gas used by the consumer contract's callback
        gasPriceWei: BigInt(gasPriceWei), // Gas price in gWei
      });
  
    console.log(
      `Fulfillment cost estimated to ${ethers.utils.formatEther(
        estimatedCostInJuels
      )} LINK`
    );
  
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
    // const donHostedSecretsVersion = 1701864046 // found this after 1 manual try

      console.log("donHostedSecretsVersion", donHostedSecretsVersion)
      const functionsConsumer = new ethers.Contract(
      consumerAddress,
      functionsConsumerAbi,
      signer
    );
    // Actual transaction call
   
    const transaction = await functionsConsumer.sendRequest(
      source, // source
      "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
      slotIdNumber, // slot ID of the encrypted secrets
      donHostedSecretsVersion, // version of the encrypted secrets
      24308703216449665528637752374872361740983978940004854943937687158795473409n,
      args,
      [], // bytesArgs - arguments can be encoded off-chain to bytes.
      subscriptionId,
      gasLimit,
      ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
    );
  
    //return resolve(donHostedSecretsVersion);
  
    // Log transaction details
    console.log(
      `\n✅ Functions request sent! Transaction hash ${transaction.hash}. Waiting for a response...`
    );
  
    console.log(
      `See your request in the explorer ${explorerUrl}/tx/${transaction.hash}`
    );
  
    const responseListener = new ResponseListener({
      provider: provider,
      functionsRouterAddress: routerAddress,
    }); // Instantiate a ResponseListener object to wait for fulfillment.
    
    
   
    (async () => {
      try {
        const response: any = await new Promise((resolve, reject) => {
          responseListener
            .listenForResponseFromTransaction(transaction.hash)
            .then((response: any) => {
              resolve(response); // Resolves once the request has been fulfilled.
            })
            .catch((error: any) => {
              reject(error); // Indicate that an error occurred while waiting for fulfillment.
            });
        });
  
        const fulfillmentCode = response.fulfillmentCode;
  
        if (fulfillmentCode === FulfillmentCode.FULFILLED) {
          console.log(
            `\n✅ Request ${
              response.requestId
            } successfully fulfilled. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        } else if (fulfillmentCode === FulfillmentCode.USER_CALLBACK_ERROR) {
          console.log(
            `\n⚠️ Request ${
              response.requestId
            } fulfilled. However, the consumer contract callback failed. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        } else {
          console.log(
            `\n❌ Request ${
              response.requestId
            } not fulfilled. Code: ${fulfillmentCode}. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        }
  
        const errorString = response.errorString;
        if (errorString) {
          console.log(`\n❌ Error during the execution: `, errorString);
          rej('Error during the execution' + errorString);
        } else {
          const responseBytesHexstring = response.responseBytesHexstring;
          if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
            const decodedResponse = decodeResult(
              response.responseBytesHexstring,
              ReturnType.string
            );
            console.log(
              `\n✅ Decoded response to ${ReturnType.uint256}: `,
              decodedResponse
            );
            resolve({ walletIndex: decodedResponse.toString() });
          }
        }
        
      } catch (error) {
        console.error("Error listening for response:", error);
      }
    })();
    
  })
};

export default makeRequest;