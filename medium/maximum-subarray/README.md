# 53. Maximum Subarray

**Difficulty:** Medium
**Topics:** Array, Divide and Conquer, Dynamic Programming
**Companies:** Amazon, Microsoft, LinkedIn, Apple, Google

## 📱 Offline Mode Notice

**This problem data is from the fallback database** because LeetCode API is currently unavailable.

**Limitations:**
- Problem data may not be the most recent version
- Some advanced features may be limited
- Test cases are generated based on available examples

**To get the latest data:** Try again when you have internet connectivity and LeetCode is accessible.

**Completeness Score:** 100%

## Problem Description

Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.

## Examples

### Example 1
**Input:** nums = [-2,1,-3,4,-1,2,1,-5,4]
**Output:** 6
**Explanation:** The subarray [4,-1,2,1] has the largest sum 6.

### Example 2
**Input:** nums = [1]
**Output:** 1
**Explanation:** The subarray [1] has the largest sum 1.

### Example 3
**Input:** nums = [5,4,-1,7,8]
**Output:** 23
**Explanation:** The subarray [5,4,-1,7,8] has the largest sum 23.

## Constraints

- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

## Follow-up

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

## Hints

**Level 1:** This is a classic dynamic programming problem (Kadane's algorithm)

**Level 2:** At each position, decide whether to extend the current subarray or start a new one

**Level 3:** Keep track of the maximum sum ending at current position and global maximum

## Links

- [LeetCode Problem](https://leetcode.com/problems/maximum-subarray/)

## Notes

- Use `lct test maximum-subarray` to run tests
- Use `lct hint maximum-subarray` for hints
- Use `lct open maximum-subarray` to open in browser