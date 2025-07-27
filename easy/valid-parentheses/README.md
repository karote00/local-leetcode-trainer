# 20. Valid Parentheses

**Difficulty:** Easy
**Topics:** String, Stack
**Companies:** Amazon, Google, Facebook, Microsoft, Apple

## 📱 Offline Mode Notice

**This problem data is from the fallback database** because LeetCode API is currently unavailable.

**Limitations:**
- Problem data may not be the most recent version
- Some advanced features may be limited
- Test cases are generated based on available examples

**To get the latest data:** Try again when you have internet connectivity and LeetCode is accessible.

**Completeness Score:** 100%

## Problem Description

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Examples

### Example 1
**Input:** s = "()"
**Output:** true
**Explanation:** The string contains valid parentheses.

### Example 2
**Input:** s = "()[]{}"
**Output:** true
**Explanation:** The string contains valid combinations of all bracket types.

### Example 3
**Input:** s = "(]"
**Output:** false
**Explanation:** The brackets are not properly matched.

## Constraints

- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'.



## Hints

**Level 1:** Use a stack data structure to keep track of opening brackets

**Level 2:** When you see a closing bracket, check if it matches the most recent opening bracket

**Level 3:** The string is valid if the stack is empty at the end

## Links

- [LeetCode Problem](https://leetcode.com/problems/valid-parentheses/)

## Notes

- Use `lct test valid-parentheses` to run tests
- Use `lct hint valid-parentheses` for hints
- Use `lct open valid-parentheses` to open in browser