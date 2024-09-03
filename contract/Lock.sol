// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;
    uint256 public totalAllocPoint = 45;
    event Withdrawal(uint amount, uint when);



 

    function getBalance() public view returns (uint256) {
        return address(msg.sender).balance;
    }
    function getContractBalance(address contractaddr) public view returns (uint256) {
        return address(contractaddr).balance;
    }

    // Transfer specific amount to meta mask wallet from contract
    function withdraw(uint256 amount) public {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(msg.sender).transfer(amount);
    }

    // Transfer all amount to meta mask wallet from contract
    function withdrawAll() public {
        payable(msg.sender).transfer(address(this).balance);
    }
    // Transfer specific amount to contract from meta mask wallet
    function deposit() public payable {
        
    }

    function transfetTo(address payable re, uint256 amount) public {
        require(amount <= address(this).balance, "Insufficient balance");
        re.transfer(amount);
    }
}

