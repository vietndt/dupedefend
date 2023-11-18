//Verifier service will be provided by dupedefend backend as well alternatively clients can verify in explorer

const sigProofOk = await proofService.verifyProof(
    proof,
    CircuitId.AtomicQuerySigV2 // or CircuitId.AtomicQueryMTPV2
  );

