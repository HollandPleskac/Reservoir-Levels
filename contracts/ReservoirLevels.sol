pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ReservoirLevels is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public orovilleLakeHeight;
    uint256 public trinityLakeHeight;
    string public lastReq;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        lastReq = "trinity";
    }


    function requestHeightData(string memory lakeName) public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        request.add("get", string(abi.encodePacked("https://water-levels-api.herokuapp.com/",lakeName)));

        // Set the path to find the desired data in the API response, where the response format is:
        // {"height":x}
        request.add("path", "height");

        // Multiply the result by 1000000000000000000 to remove decimals
        // int timesAmount = 10**18;
        // request.addInt("times", timesAmount);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _height) public recordChainlinkFulfillment(_requestId)
    {
        if (keccak256(abi.encodePacked((lastReq))) == keccak256(abi.encodePacked(("trinity")))) {
            orovilleLakeHeight = _height;
            lastReq = "oroville";
        } else {
            trinityLakeHeight = _height;
            lastReq = "trinity";
        }
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

