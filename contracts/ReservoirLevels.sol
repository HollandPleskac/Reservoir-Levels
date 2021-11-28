// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ReservoirLevelsTest3 is KeeperCompatibleInterface, ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public orovilleLakeHeight;
    uint256 public trinityLakeHeight;
    uint256 public orovilleHistoricalAvgHeight;
    uint256 public trinityHistoricalAvgHeight;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    uint public counter;
    address[] participants;
    // uint public fetchedCount;
    // uint public fundsCount;
    // uint public histAvgCount;

    uint public immutable interval;
    uint public lastTimeStamp;
    
    constructor(uint updateInterval) payable {
      setPublicChainlinkToken();
      interval = updateInterval;
      lastTimeStamp = block.timestamp;

      oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
      jobId = "d5270d1c311941d0b08bead21fea7747";
      fee = 0.1 * 10 ** 18; // 0.1 LINK

      counter = 0;
    //   fetchedCount = 0;
    //   fundsCount = 0;
    //   histAvgCount = 0;
    }

    function checkUpkeep(bytes calldata /* checkData */) external override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
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
            distributeFunds();
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
            // 1 month (distribute funds) dont update reservoir levels
            distributeFunds();
        } else {
            // update reservoir levels
            fetchReservoirLevels();
        }
    }

    function fetchReservoirLevels() private {
        // fetchedCount++;
        requestOrovilleHeight();
        requestTrinityHeight();
    }

    function distributeFunds() public payable {
        if (orovilleLakeHeight > orovilleHistoricalAvgHeight && trinityLakeHeight > trinityHistoricalAvgHeight) {
            for(uint i = 0; i < participants.length; i++) {
                payable(participants[i]).transfer(1000000000000000000);
            }
        }
    }

    function getNewHistoricalAvg() private {
        // histAvgCount++;
        requestOrovilleHistoricalAvgHeight();
        requestTrinityHistoricalAvgHeight();
    }



    // Call API

    // REQUEST FUNCTIONS

    function requestOrovilleHeight() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillOrovilleHeight.selector);
        request.add("get", "https://water-levels-api.herokuapp.com/oroville_lake");
        // {"height":x}
        request.add("path", "height");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function requestTrinityHeight() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillTrinityHeight.selector);
        request.add("get", "https://water-levels-api.herokuapp.com/trinity_lake");
        request.add("path", "height");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function requestOrovilleHistoricalAvgHeight() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillOrovilleHistoricalAvgHt.selector);
        request.add("get", "https://water-levels-api.herokuapp.com/oroville_lake_historical_avg");
        request.add("path", "height");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function requestTrinityHistoricalAvgHeight() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillTrinityHistoricalAvgHt.selector);
        request.add("get", "https://water-levels-api.herokuapp.com/trinity_lake_historical_avg");
        request.add("path", "height");

        return sendChainlinkRequestTo(oracle, request, fee);
    }


    // FULFILL FUNCTIONS

    function fulfillOrovilleHeight(bytes32 _requestId, uint256 _height) public recordChainlinkFulfillment(_requestId)
    {
        orovilleLakeHeight = _height;
    }

    function fulfillTrinityHeight(bytes32 _requestId, uint256 _height) public recordChainlinkFulfillment(_requestId)
    {
        trinityLakeHeight = _height;
    }

    function fulfillOrovilleHistoricalAvgHt(bytes32 _requestId, uint256 _height) public recordChainlinkFulfillment(_requestId)
    {
        orovilleHistoricalAvgHeight = _height;
    }

    function fulfillTrinityHistoricalAvgHt(bytes32 _requestId, uint256 _height) public recordChainlinkFulfillment(_requestId)
    {
        trinityHistoricalAvgHeight = _height;
    }
}