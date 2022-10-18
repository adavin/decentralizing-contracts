import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"
dotenv.config()

//require('hardhat-abi-exporter');

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ],
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      //from?: string;
      gas: 67219750,
      gasPrice: 20000000000,
      //gasMultiplier: 5,
      //blockGasLimit: 30000000000,
      //gasPrice: 100,
      //throwOnTransactionFailures: true,
      //throwOnCallFailures : true,
      //hardfork: 'petersburg',
      allowUnlimitedContractSize: true,
      loggingEnabled: true,
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY,
      chainId: 5,
      //gas: 'auto',
      gasPrice: 'auto',
      blockGasLimit: 30000000,
      allowUnlimitedContractSize: true,
    },
    node: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
      gas: 'auto',
      gasPrice: 'auto',
    }
  },
};

export default config;
