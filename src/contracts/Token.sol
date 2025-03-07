// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  address public minter;

  //add minter changed event
  event MinterChanged(address  indexed from, address to);

  constructor() payable ERC20("Decentralized Bank of India Currency", "DCIB") {
    minter = msg.sender;
  }

//Add pass minter role function
  function passMinterRole(address dBank) public returns (bool) {
require(msg.sender==minter ,'Error, only owner can change pass minter role');
minter = dBank;
emit MinterChanged(msg.sender , dBank);
return true;
}

  
  function mint(address account, uint256 amount) public {
    require(msg.sender == minter , 'ERROR! , unauthorized minter');
		_mint(account, amount);
	}
}