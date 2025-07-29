# 7. Reverse Integer

**Difficulty:** Medium
**Topics:** Math
**Companies:** Amazon, Apple, Bloomberg

## 📱 Offline Mode Notice

**This problem data is from the fallback database** because LeetCode API is currently unavailable.

**Limitations:**
- Problem data may not be the most recent version
- Some advanced features may be limited
- Test cases are generated based on available examples

**To get the latest data:** Try again when you have internet connectivity and LeetCode is accessible.

**Completeness Score:** 90%

## Problem Description

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

## Examples

### Example 1
**Input:** x = 123
**Output:** 321


### Example 2
**Input:** x = -123
**Output:** -321


### Example 3
**Input:** x = 120
**Output:** 21


## Constraints

- -2^31 <= x <= 2^31 - 1



## Hints

**Level 1:** Use modulo and division to extract digits

**Level 2:** Check for overflow before returning

**Level 3:** Handle negative numbers carefully

## Links

- [LeetCode Problem](https://leetcode.com/problems/reverse-integer/)

## Notes

- Use `lct test reverse-integer` to run tests
- Use `lct hint reverse-integer` for hints
- Use `lct open reverse-integer` to open in browser