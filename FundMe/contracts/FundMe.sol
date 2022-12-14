//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "./PriceConverter.sol";

error FundMe_error();

contract FundMe {
    using PriceConverter for uint256;

    uint256 constant MINIMUM_USD = 50 * 1e18;
    address immutable owner;

    AggregatorV3Interface public priceFeed;

    mapping(address => uint256) public fundedByAddress;

    address[] public funders;

    modifier onlyOwner() {
        if (msg.sender != owner) revert FundMe_error();
        _;
    }

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(
            msg.value.convert(priceFeed) >= MINIMUM_USD,
            "Send minimum 50$ worth ethereum"
        );

        if (fundedByAddress[msg.sender] == 0) {
            funders.push(msg.sender);
        }
        fundedByAddress[msg.sender] += msg.value;
    }

    function withDraw() public onlyOwner {
        (bool success, ) = payable(owner).call{value: address(this).balance}(
            ""
        );
        require(success, "Transaction failed");
    }

    function getFunders() public view returns (address[] memory) {
        return funders;
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}
