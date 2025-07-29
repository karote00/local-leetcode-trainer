# 44. Wildcard Matching

**Difficulty:** Hard
**Topics:** String, Dynamic Programming, Greedy, Recursion
**Companies:** Amazon, Microsoft, Google

## Problem Description

Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for "?" and "*" where "?" matches any single character and "*" matches any sequence of characters (including the empty sequence).

## Examples

### Example 1
**Input:** s = "aa", p = "a"
**Output:** false
**Explanation:** "a" does not match the entire string "aa".

### Example 2
**Input:** s = "aa", p = "*"
**Output:** true
**Explanation:** "*" matches any sequence.

### Example 3
**Input:** s = "cb", p = "?a"
**Output:** false
**Explanation:** "?" matches "c", but the second letter is "a", which does not match "b".

## Constraints

- 0 <= s.length, p.length <= 2000
- s contains only lowercase English letters.
- p contains only lowercase English letters, "?" or "*".



## Hints

**Level 1:** Use dynamic programming or greedy approach

**Level 2:** Handle "*" by trying to match zero or more characters

## Links

- [LeetCode Problem](https://leetcode.com/problems/wildcard-matching/)

## Notes

- Use `lct test wildcard-matching` to run tests
- Use `lct hint wildcard-matching` for hints
- Use `lct open wildcard-matching` to open in browser