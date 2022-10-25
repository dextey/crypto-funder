//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function convert(uint256 ethAmount, AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        // price comes with 8decimals
        (, int256 price, , , ) = priceFeed.latestRoundData();

        uint256 ethPrice = (ethAmount * uint256(price * 1e10)) / 1e18;

        return ethPrice;
    }
}
