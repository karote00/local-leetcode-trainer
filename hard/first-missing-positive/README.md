# 41. First Missing Positive

**Difficulty:** Hard
**Topics:** Array, Hash Table
**Companies:** Amazon, Microsoft, Facebook

## Problem Description

Given an unsorted integer array nums, return the smallest missing positive integer.

## Examples

### Example 1
**Input:** nums = [1,2,0]
**Output:** 3
**Explanation:** The numbers in the range [1,2] are all in the array.

### Example 2
**Input:** nums = [3,4,-1,1]
**Output:** 2
**Explanation:** The number 2 is missing.

### Example 3
**Input:** nums = [7,8,9,11,12]
**Output:** 1
**Explanation:** The smallest positive integer 1 is missing.

## Constraints

- 1 <= nums.length <= 10^5
- -2^31 <= nums[i] <= 2^31 - 1



## Hints

**Level 1:** Use the array itself as a hash table

**Level 2:** Place each number at its correct index position

## Links

- [LeetCode Problem](https://leetcode.com/problems/first-missing-positive/)

## Notes

- Use `lct test first-missing-positive` to run tests
- Use `lct hint first-missing-positive` for hints
- Use `lct open first-missing-positive` to open in browser