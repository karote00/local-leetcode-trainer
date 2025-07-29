# 9. Palindrome Number

**Difficulty:** Easy
**Topics:** Math
**Companies:** Amazon, Apple, Microsoft

## Problem Description

Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.

For example, 121 is a palindrome while 123 is not.

## Examples

### Example 1
**Input:** x = 121
**Output:** true
**Explanation:** 121 reads the same backward as forward.

### Example 2
**Input:** x = -121
**Output:** false
**Explanation:** From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

### Example 3
**Input:** x = 10
**Output:** false
**Explanation:** Reads 01 from right to left. Therefore it is not a palindrome.

## Constraints

- -2^31 <= x <= 2^31 - 1



## Hints

**Level 1:** Beware of overflow when you reverse the integer.

**Level 2:** Could you solve it without converting the integer to a string?

**Level 3:** You can reverse half of the number and compare it with the other half.

## Links

- [LeetCode Problem](https://leetcode.com/problems/palindrome-number/)

## Notes

- Use `lct test palindrome-number` to run tests
- Use `lct hint palindrome-number` for hints
- Use `lct open palindrome-number` to open in browser