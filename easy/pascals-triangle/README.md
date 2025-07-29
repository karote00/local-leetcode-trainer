# 118. Pascal's Triangle

**Difficulty:** Easy
**Topics:** Array, Dynamic Programming
**Companies:** Amazon, Microsoft, Apple

## Problem Description

Given an integer numRows, return the first numRows of Pascal's triangle.

## Examples

### Example 1
**Input:** numRows = 5
**Output:** [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
**Explanation:** Pascal's triangle with 5 rows.

### Example 2
**Input:** numRows = 1
**Output:** [[1]]
**Explanation:** Single row.

## Constraints

- 1 <= numRows <= 30



## Hints

**Level 1:** Each element is sum of two elements above it

**Level 2:** triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]

## Links

- [LeetCode Problem](https://leetcode.com/problems/pascals-triangle/)

## Notes

- Use `lct test pascals-triangle` to run tests
- Use `lct hint pascals-triangle` for hints
- Use `lct open pascals-triangle` to open in browser