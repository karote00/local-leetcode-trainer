# 70. Climbing Stairs

**Difficulty:** Easy
**Topics:** Math, Dynamic Programming, Memoization
**Companies:** Amazon, Adobe, Apple, Google, Microsoft

## 📱 Offline Mode Notice

**This problem data is from the fallback database** because LeetCode API is currently unavailable.

**Limitations:**
- Problem data may not be the most recent version
- Some advanced features may be limited
- Test cases are generated based on available examples

**To get the latest data:** Try again when you have internet connectivity and LeetCode is accessible.

**Completeness Score:** 100%

## Problem Description

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Examples

### Example 1
**Input:** n = 2
**Output:** 2
**Explanation:** There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

### Example 2
**Input:** n = 3
**Output:** 3
**Explanation:** There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

## Constraints

- 1 <= n <= 45



## Hints

**Level 1:** This is a Fibonacci sequence in disguise

**Level 2:** To reach step n, you can come from step n-1 or step n-2

**Level 3:** Use dynamic programming or optimize space to O(1)

## Links

- [LeetCode Problem](https://leetcode.com/problems/climbing-stairs/)

## Notes

- Use `lct test climbing-stairs` to run tests
- Use `lct hint climbing-stairs` for hints
- Use `lct open climbing-stairs` to open in browser