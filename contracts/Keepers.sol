// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

contract Counter is KeeperCompatibleInterface {
    /**
    * Public counter variable
    */
    uint public counter;
    uint public fetchedCount;
    uint public fundsCount;
    uint public histAvgCount;

    /**
    * Use an interval in seconds and a timestamp to slow execution of Upkeep
    */
    uint public immutable interval;
    uint public lastTimeStamp;
    
    constructor(uint updateInterval) {
      interval = updateInterval;
      lastTimeStamp = block.timestamp;

      counter = 0;
      fetchedCount = 0;
      fundsCount = 0;
      histAvgCount = 0;
    }

    function checkUpkeep(bytes calldata /* checkData */) external override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // perform upkeep every day
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        
        if (counter!= 1 && counter%6==1) {
            // 1 year (get new historical avg)
            // get reservoir levels
            getNewHistoricalAvg();
            fetchReservoirLevels();
        } else if (counter%3 == 0) {
            // 1 month (dole out funds) dont update reservoir levels
            doleOutFunds();
        } else {
            // update reservoir levels
            fetchReservoirLevels();
        }
    }   

    function simulateUpkeep() public {
        counter = counter + 1;
        
        if (counter!= 1 && counter%6==1) {
            // 1 year (get new historical avg)
            // get reservoir levels
            getNewHistoricalAvg();
            fetchReservoirLevels();
        } else if (counter%3 == 0) {
            // 1 month (dole out funds) dont update reservoir levels
            doleOutFunds();
        } else {
            // update reservoir levels
            fetchReservoirLevels();
        }
    }

    function fetchReservoirLevels() public {
        fetchedCount++;
    }

    function doleOutFunds() public {
        fundsCount++;
    }

    function getNewHistoricalAvg() public {
        histAvgCount++;
    }
}