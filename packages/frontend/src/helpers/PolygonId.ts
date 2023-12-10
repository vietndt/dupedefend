import {
  BjjProvider, CredentialStorage, CredentialWallet, defaultEthConnectionConfig, EthStateStorage, ICredentialWallet, IDataStorage,
  Identity, IdentityStorage, IdentityWallet, IIdentityWallet, InMemoryDataSource, InMemoryMerkleTreeStorage, InMemoryPrivateKeyStore,
  KMS, KmsKeyType, Profile, W3CCredential, EthConnectionConfig, CredentialStatusType, CredentialStatusResolverRegistry, IssuerResolver, RHSResolver,
  OnChainResolver, AgentResolver, core, AbstractPrivateKeyStore
} from '@0xpolygonid/js-sdk';

export const initInMemoryDataStorage = () => {
  let conf: EthConnectionConfig = defaultEthConnectionConfig;
  conf.contractAddress = '0x134B1BE34911E39A8397ec6289782989729807a4';
  conf.url = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`;

  var dataStorage = {
    credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
    identity: new IdentityStorage(
      new InMemoryDataSource<Identity>(),
      new InMemoryDataSource<Profile>()
    ),
    mt: new InMemoryMerkleTreeStorage(40),

    states: new EthStateStorage(defaultEthConnectionConfig)
  };

  return dataStorage;
}

export const initIdentityWallet = async (
  dataStorage: IDataStorage,
  credentialWallet: ICredentialWallet,
  keyStore: AbstractPrivateKeyStore
): Promise<IIdentityWallet> => {
  const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, keyStore);
  const kms = new KMS();
  kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);

  return new IdentityWallet(kms, dataStorage, credentialWallet);
}

export const initCredentialWallet = async (dataStorage: IDataStorage): Promise<CredentialWallet> => {
  const resolvers = new CredentialStatusResolverRegistry();
  resolvers.register(CredentialStatusType.SparseMerkleTreeProof, new IssuerResolver());
  resolvers.register(
    CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    new RHSResolver(dataStorage.states)
  );
  resolvers.register(
    CredentialStatusType.Iden3OnchainSparseMerkleTreeProof2023,
    new OnChainResolver([defaultEthConnectionConfig])
  );
  resolvers.register(CredentialStatusType.Iden3commRevocationStatusV1, new AgentResolver());

  return new CredentialWallet(dataStorage, resolvers);
}

export const initInMemoryDataStorageAndWallets = async () => {
  const dataStorage: any = initInMemoryDataStorage();
  const credentialWallet = await initCredentialWallet(dataStorage);
  const memoryKeyStore = new InMemoryPrivateKeyStore();

  const identityWallet = await initIdentityWallet(dataStorage, credentialWallet, memoryKeyStore);

  return {
    dataStorage,
    credentialWallet,
    identityWallet
  };
}

export const createIdentity = async (identityWallet: IIdentityWallet, privateKey: string) => {
  const { did, credential } = await identityWallet.createIdentity({
    method: core.DidMethod.Iden3,
    blockchain: core.Blockchain.Polygon,
    networkId: core.NetworkId.Mumbai,
    revocationOpts: {
      type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      id: 'https://rhs-staging.polygonid.me'
    },
    seed: Buffer.from(privateKey, 'hex')
  });

  return {
    did,
    credential
  };
}

export const identityCreation = async (privateKey: string) => {
  let { identityWallet } = await initInMemoryDataStorageAndWallets();
  const { did, credential } = await createIdentity(identityWallet, privateKey);
  return { did, credential };
}
