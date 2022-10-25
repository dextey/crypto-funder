//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "./PriceConverter.sol";

error FundMe_error();

contract FundMe {
    using PriceConverter for uint256;

    uint256 constant MINIMUM_USD = 50 * 1e18;
    address immutable owner;

    AggregatorV3Interface public priceFeed;

    mapping(address => uint256) fundedByAddress;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(
            msg.value.convert(priceFeed) >= MINIMUM_USD,
            "Send minimum 50$ worth ethereum"
        );
    }
}
