# 121. Best Time to Buy and Sell Stock

**Difficulty:** Easy
**Topics:** Array, Dynamic Programming
**Companies:** Amazon, Microsoft, Facebook

## Problem Description

You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

## Examples

### Example 1
**Input:** prices = [7,1,5,3,6,4]
**Output:** 5
**Explanation:** Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

### Example 2
**Input:** prices = [7,6,4,3,1]
**Output:** 0
**Explanation:** In this case, no transactions are done and the max profit = 0.

## Constraints

- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4



## Hints

**Level 1:** Track minimum price seen so far

**Level 2:** For each price, calculate profit if selling today

## Links

- [LeetCode Problem](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## Notes

- Use `lct test best-time-to-buy-and-sell-stock` to run tests
- Use `lct hint best-time-to-buy-and-sell-stock` for hints
- Use `lct open best-time-to-buy-and-sell-stock` to open in browser