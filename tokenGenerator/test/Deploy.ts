import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { Token, TokenFactory, Token__factory } from "../typechain-types";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
//import { expect } from "chai";
import { TokenFactoryInterface  } from '../typechain-types/contracts/TokenFactory'
import { TokenFactory__factory } from "../typechain-types/factories/contracts/TokenFactory__factory";

/* TODO

async function main() {
  const [owner, addr1, addr2, addr3, addr4, addr5, ...addrs] = await ethers.getSigners()
  const tokenFactory:TokenFactory__factory = await ethers.getContractFactory("TokenFactory")
  const TokenFactory:TokenFactory = await tokenFactory.deploy()
  await TokenFactory.connect(addr1).createToken(ethers.utils.parseEther('1000000000.0'), "BootyCoin", "BTY")
  await TokenFactory.connect(addr1).createToken(ethers.utils.parseEther('1000000000.0'), "AssCoin", "ASS")
  await TokenFactory.connect(addr2).createToken(ethers.utils.parseEther('1000000000.0'), "PeenCoin", "PEEN")
  const tokens: Array<Token> = []
  const tokenCount = parseInt((await TokenFactory.tokenCount()).toString())
  for (let i=0; i<tokenCount; i++) {
    tokens.push(await ethers.getContractAt("Token", (await TokenFactory.tokens(i))))
  }
  console.log(21, tokens[0].address)
}
*/
