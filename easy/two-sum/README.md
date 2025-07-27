# 1. Two Sum

**Difficulty:** Easy
**Topics:** Array, Hash Table
**Companies:** Amazon, Google, Apple, Microsoft, Facebook

## 📱 Offline Mode Notice

**This problem data is from the fallback database** because LeetCode API is currently unavailable.

**Limitations:**
- Problem data may not be the most recent version
- Some advanced features may be limited
- Test cases are generated based on available examples

**To get the latest data:** Try again when you have internet connectivity and LeetCode is accessible.

**Completeness Score:** 100%

## Problem Description

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

## Examples

### Example 1
**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

### Example 2
**Input:** nums = [3,2,4], target = 6
**Output:** [1,2]
**Explanation:** Because nums[1] + nums[2] == 6, we return [1, 2].

### Example 3
**Input:** nums = [3,3], target = 6
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 6, we return [0, 1].

## Constraints

- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.



## Hints

**Level 1:** Think about what data structure allows fast lookups

**Level 2:** Use a hash map to store numbers you've seen and their indices

**Level 3:** For each number, check if target - number exists in your hash map

## Links

- [LeetCode Problem](https://leetcode.com/problems/two-sum/)

## Notes

- Use `lct test two-sum` to run tests
- Use `lct hint two-sum` for hints
- Use `lct open two-sum` to open in browser