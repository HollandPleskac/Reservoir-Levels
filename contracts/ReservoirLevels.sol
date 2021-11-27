pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ReservoirLevels is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public orovilleLakeHeight;
    uint256 public trinityLakeHeight;
    uint256 public orovilleHistoricalAvgHeight;
    uint256 public trinityHistoricalAvgHeight;
    string public lastReq;
    uint public count;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        lastReq = "trinity";
        count = 0;
    }

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
        count++;
    }

    function fulfillTrinityHeight(bytes32 _requestId, uint256 _height) public recordChainlinkFulfillment(_requestId)
    {
        trinityLakeHeight = _height;
        count++;
    }

    function fulfillOrovilleHistoricalAvgHt(bytes32 _requestId, uint256 _height) public recordChainlinkFulfillment(_requestId)
    {
        orovilleHistoricalAvgHeight = _height;
    }

    function fulfillTrinityHistoricalAvgHt(bytes32 _requestId, uint256 _height) public recordChainlinkFulfillment(_requestId)
    {
        trinityHistoricalAvgHeight = _height;
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

}

