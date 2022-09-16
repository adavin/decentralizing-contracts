// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Token is ERC20, AccessControl, Pausable {
    address public owner;
    address public creator;
    address public factory;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    uint256 public maxMint;

    constructor(uint256 initialSupply, string memory name, string memory symbol, address creatorAccount, address ownerAccount) ERC20(name, symbol) {
        factory = msg.sender;
        creator = creatorAccount;
        owner = ownerAccount;
        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(MINTER_ROLE, creator);
        _grantRole(BURNER_ROLE, creator);
        _mint(creator, initialSupply);
        maxMint = 0;
    }

    //  To avoid repition for similar roles/privileges, we create our own modifier
    modifier creatorOrAdmin() {
        require(msg.sender == creator || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "This function can only be called from this Token contract's creator address or an admin.");
        _;
    }


    //  Add/remove mint+burn role
    function addMintAndBurn(address account) public whenNotPaused creatorOrAdmin {
        _grantRole(MINTER_ROLE, account);
        _grantRole(BURNER_ROLE, account);
    }
    function removeMintAndBurn(address account) public whenNotPaused creatorOrAdmin {
        _revokeRole(MINTER_ROLE, account);
        _revokeRole(BURNER_ROLE, account);
    }

    //  In case we should delete a token contract, it's only deletable by ADMIN
    function destructToken() public payable creatorOrAdmin {   
        selfdestruct(payable(address(msg.sender)));
    }

    //  we want the transfers to be pausable
    function transfer(address recipient, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return ERC20.transfer(recipient, amount);
    }
    function transferFrom(address sender, address recipient, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return ERC20.transferFrom(sender, recipient, amount);
    }

    //  Only the creator or an ADMIN role can pause/unpause
    function pauseToken() public whenNotPaused creatorOrAdmin {
        _pause();
    }
    function unpauseToken() public whenPaused creatorOrAdmin {
        _unpause();
    }

    //  Contracts must not be paused, and the msg sender must have the MINTER_ROLE
    function mint(address to, uint256 amount) public whenNotPaused onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    function burn(address from, uint256 amount) public whenNotPaused onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }

    //we want our DFD tokens to be mintable, but we want to limit the amount that a user can mint at one time. 
    function faucetMint(uint256 amount) public whenNotPaused {
        require (amount > 0 && amount <= maxMint, "The amount requested from the faucet exceeds the faucet's limit");
        _mint(msg.sender, amount);
    }
    function _setMaxMint(uint256 amount) public creatorOrAdmin {
        maxMint = amount;
    }
}
