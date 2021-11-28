// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Distribute {

    address[] participants;

    constructor() payable {

    }
    
    function addToParticipants(address addr) public {
        participants.push(addr);
    }


    function distribute() public payable {
        for(uint i = 0; i < participants.length; i++) {
            payable(participants[i]).transfer(1000000000000000000);
        }
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getParticipant(uint index) public view returns(address) {
        return participants[index];

    }
}