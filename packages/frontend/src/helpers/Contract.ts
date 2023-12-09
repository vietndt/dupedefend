
export const getABI = (contractName: string) => {
  const abi = require(`../abi/${contractName}.json`)
  return abi;
}
