import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { Token, TokenFactory, Token__factory } from "../typechain-types";
import { TokenFactory__factory } from "../typechain-types/factories/contracts/Token.sol";

async function main() {
  const [owner, addr1, addr2, addr3, addr4, addr5, ...addrs] = await ethers.getSigners()
  const tokenFactory = await ethers.getContractFactory("TokenFactory")
  const TokenFactory = await tokenFactory.deploy()
  await TokenFactory.connect(addr1).createToken(ethers.utils.parseEther('1000000000.0'), "Coin1", "ONE")
  await TokenFactory.connect(addr1).createToken(ethers.utils.parseEther('1000000000.0'), "Coin2", "TWO")
  await TokenFactory.connect(addr2).createToken(ethers.utils.parseEther('1000000000.0'), "Coin3", "THREE")
  const tokens = []
  const tokenCount = (await TokenFactory.tokenCount()).toNumber()
  for (let i=0; i<tokenCount; i++) tokens.push(await ethers.getContractAt("Token", (await TokenFactory.tokens(i))))
}



