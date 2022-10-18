import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from 'hardhat';
import { UniswapV2Factory__factory }  from '../typechain-types/factories/factory/UniswapV2Factory__factory'
import { UniswapV2Factory, UniswapV2Router02, UniswapV2Router02__factory } from '../typechain-types'
//import { Token, TokenFactory, Token__factory } from "../typechain-types";
//import { TokenFactory__factory } from "../typechain-types/factories/contracts/TokenFactory__factory";
async function main() {
  //const [owner, addr1, addr2, addr3, addr4, addr5, ...addrs]:SignerWithAddress[] = await ethers.getSigners()
  //let provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');
  //const provider = new ethers.providers.InfuraProvider( 'goerli', '')
  const sgn = new ethers.Wallet('', ethers.getDefaultProvider()) //goerli
  //const sgn = new ethers.Wallet('', provider) //hardhat
  const uniswapFactory:UniswapV2Factory__factory  = await ethers.getContractFactory("UniswapV2Factory")
  const UniswapFactory:UniswapV2Factory = await uniswapFactory.connect(sgn).deploy(sgn.address)
  const GOERLI_WETH:string = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
  //console.log(sgn.address)
  console.log(`factory->`, UniswapFactory.address)
  console.log(`initcodehash->`, await UniswapFactory.connect(sgn).INIT_CODE_HASH())
  const uniswapRouter: UniswapV2Router02__factory = await ethers.getContractFactory('UniswapV2Router02')
  const UniswapRouter: UniswapV2Router02 = await uniswapRouter.connect(sgn).deploy(UniswapFactory.address, GOERLI_WETH) 
  console.log(`router->`, UniswapRouter.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

