# 70. Climbing Stairs

**Difficulty:** Easy
**Topics:** Math, Dynamic Programming, Memoization
**Companies:** Amazon, Adobe, Apple

## Problem Description

You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Examples

### Example 1
**Input:** n = 2
**Output:** 2
**Explanation:** There are two ways: 1. 1 step + 1 step 2. 2 steps

### Example 2
**Input:** n = 3
**Output:** 3
**Explanation:** There are three ways: 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step

## Constraints

- 1 <= n <= 45



## Hints

**Level 1:** This is a Fibonacci sequence

**Level 2:** f(n) = f(n-1) + f(n-2)

## Links

- [LeetCode Problem](https://leetcode.com/problems/climbing-stairs/)

## Notes

- Use `lct test climbing-stairs` to run tests
- Use `lct hint climbing-stairs` for hints
- Use `lct open climbing-stairs` to open in browser