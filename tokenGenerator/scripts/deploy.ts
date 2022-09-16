import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from 'hardhat';
import { Token, TokenFactory, Token__factory } from "../typechain-types";
import { TokenFactory__factory } from "../typechain-types/factories/contracts/TokenFactory__factory";

async function main() {
  const [owner, addr1, addr2, addr3, addr4, addr5, ...addrs]:SignerWithAddress[] = await ethers.getSigners()
  const tokenFactory:TokenFactory__factory = await ethers.getContractFactory("TokenFactory")
  const TokenFactory:TokenFactory = await tokenFactory.deploy()
  await TokenFactory.connect(addr1).createToken(ethers.utils.parseEther('1000000000000.0'), "defi-USD", "dfdUSD")
  await TokenFactory.connect(addr1).createToken(ethers.utils.parseEther('19000000.0'), "defi-Bitcoin", "dfdBTC")
  await TokenFactory.connect(addr1).createToken(ethers.utils.parseEther('125000000.0'), "defi-Ethereum", "dfdETH")
  await TokenFactory.connect(addr1).createToken(ethers.utils.parseEther('38000000000.0'), "defi-Cardano", "dfdADA")

  const tokens: Array<Token> = []
  const tokenCount:Number = parseInt((await TokenFactory.tokenCount()).toString())
  for (let i=0; i<tokenCount; i++) {
    tokens.push(await ethers.getContractAt("Token", (await TokenFactory.tokens(i))))
  }

  await tokens[0]._setMaxMint(ethers.utils.parseEther('20000'))
  await tokens[1]._setMaxMint(ethers.utils.parseEther('1'))
  await tokens[2]._setMaxMint(ethers.utils.parseEther('10'))
  await tokens[3]._setMaxMint(ethers.utils.parseEther('50000'))

  console.log(`Token Factory: ${TokenFactory.address}`)
  for (let i=0; i<tokens.length; i++) {
    console.log(await tokens[i].name())
    console.log(tokens[i].address)
  }
  //tokens.forEach((token) => async function ( token:Token ) { console.log(`${await token.name()} -> ${token.address}`)} )
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main2() {
  const [owner, addr1, addr2, addr3, addr4, addr5, ...addrs] = await ethers.getSigners();
  const TokenFactory = await ethers.getContractAt("TokenFactory", '0x4c09a47d2277A446c5c88c8468B1268693533A83')
  TokenFactory.tokensByAddress(addr1.address)
}
