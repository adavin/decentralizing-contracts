import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      //gasMultiplier: 2,
      //blockGasLimit: 30000000000,
      gas: 'auto',
      //gasPrice: 100,
      throwOnTransactionFailures: true,
      throwOnCallFailures : true,
      //hardfork: 'petersburg',
      allowUnlimitedContractSize: true,
      loggingEnabled: true,
    },
  },
};

export default config;
