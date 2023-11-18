const dataStorage = {
  credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
  identity: new IdentityStorage(
    new InMemoryDataSource<Identity>(),
    new InMemoryDataSource<Profile>()
  ),
  mt: new InMemoryMerkleTreeStorage(40),
  states: new EthStateStorage(defaultEthConnectionConfig),
};
const memoryKeyStore = new InMemoryPrivateKeyStore();
const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
const kms = new KMS();
kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);
const credWallet = new CredentialWallet(dataStorage);
const statusRegistry = new CredentialStatusResolverRegistry();
statusRegistry.register(
  CredentialStatusType.SparseMerkleTreeProof,
  new IssuerResolver()
);
statusRegistry.register(
  CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
  new RHSResolver(dataStorage.states)
);
statusRegistry.register(
  CredentialStatusType.Iden3OnchainSparseMerkleTreeProof2023,
  new OnChainResolver([defaultEthConnectionConfig])
);
 resolvers.register(
 CredentialStatusType.Iden3commRevocationStatusV1,
 new AgentResolver()
 );

const credWallet = new CredentialWallet(dataStorage,statusRegistry);
const wallet = new IdentityWallet(kms, dataStorage, credWallet);


const seedPhraseUser: Uint8Array = byteEncoder.encode('userseedseedseedseedseedseeduser');   
const { did: userDID, credential: authBJJCredentialUser } = await identityWallet.createIdentity({
  method: DidMethod.Iden3,
  blockchain: Blockchain.Polygon,
  networkId: NetworkId.Mumbai,
  seed: seedPhraseUser,
  revocationOpts: {
    type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    id: 'https://rhs-staging.polygonid.me'
  }
});