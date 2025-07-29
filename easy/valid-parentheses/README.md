# 20. Valid Parentheses

**Difficulty:** Easy
**Topics:** String, Stack
**Companies:** Amazon, Google, Facebook, Microsoft

## Problem Description

Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.

## Examples

### Example 1
**Input:** s = "()"
**Output:** true
**Explanation:** Valid parentheses.

### Example 2
**Input:** s = "()[]{}"
**Output:** true
**Explanation:** All brackets are properly closed.

### Example 3
**Input:** s = "(]"
**Output:** false
**Explanation:** Mismatched brackets.

## Constraints

- 1 <= s.length <= 10^4
- s consists of parentheses only "()[]{}"



## Hints

**Level 1:** Use a stack to track opening brackets

**Level 2:** For each closing bracket, check if it matches the most recent opening bracket

## Links

- [LeetCode Problem](https://leetcode.com/problems/valid-parentheses/)

## Notes

- Use `lct test valid-parentheses` to run tests
- Use `lct hint valid-parentheses` for hints
- Use `lct open valid-parentheses` to open in browser