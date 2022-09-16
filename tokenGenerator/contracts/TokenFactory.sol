// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "./Token.sol";
contract TokenFactory {    
    // Stores all addresses of all tokens created
    Token[] public tokens;
    address public factoryOwner;
    // Map the creator address and push the new token address to the array
    // Creator => tokenAddresses[]
    mapping(address => address[]) public TokenOwners;

    //Events
    event TokenCreated(address indexed tokenAddress, string tokenName, address indexed creatorAddress);

    /**
     * 
     */
    constructor() {
        factoryOwner = msg.sender;
    }

    /**
     * Creates a new token, store the token address into an array, and map created tokens to the creators address
     */
    function createToken(uint256 initialSupply, string memory name, string memory symbol) public returns (address tokenResult) {
        Token token = new Token(initialSupply, name, symbol, msg.sender, factoryOwner);
        tokens.push(token);
        TokenOwners[msg.sender].push(address(token));
        emit TokenCreated(address(token), name, msg.sender);
        return address(token);
    }

    /**
     * Returns how many tokens have been created (total)
     */
    function tokenCount() public  view returns (uint count) {
        return tokens.length;
    }

    /**
     *  Returns how many tokens have been created by an address
     */
    function tokenCountByAddress(address owner) public view returns (uint count) {
        return TokenOwners[owner].length;
    }

    function tokensByAddress(address owner) public view returns (address[] memory tokensArr) {
        return TokenOwners[owner];
    }

}