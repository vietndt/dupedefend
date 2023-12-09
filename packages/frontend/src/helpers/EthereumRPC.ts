import type { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

export default class EthereumRpc {
  private provider: IProvider;

  constructor(provider: IProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      return error;
    }
  }

  async getAddress(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = await ethersProvider.getSigner();
      const address = signer.getAddress();
      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = await ethersProvider.getSigner();
      const address = signer.getAddress();
      const balance = ethers.utils.formatEther(
        await ethersProvider.getBalance(address)
      );
      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(destination: string, amount: string): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();
      const tx = await (
        await signer
      ).sendTransaction({
        to: destination,
        value: ethers.utils.parseEther(amount),
        maxPriorityFeePerGas: "5000000000",
        maxFeePerGas: "6000000000000",
      });
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage(message: string) {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();
      const signedMessage = await (await signer).signMessage(message);
      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });
      return privateKey;
    } catch (error) {
      return error as string;
    }
  }
}