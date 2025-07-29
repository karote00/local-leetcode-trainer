# 6. Zigzag Conversion

**Difficulty:** Medium
**Topics:** String
**Companies:** Amazon, Microsoft

## Problem Description

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows and then read line by line.

## Examples

### Example 1
**Input:** s = "PAYPALISHIRING", numRows = 3
**Output:** "PAHNAPLSIIGYIR"
**Explanation:** The zigzag pattern forms the output.

### Example 2
**Input:** s = "PAYPALISHIRING", numRows = 4
**Output:** "PINALSIGYAHRPI"
**Explanation:** The zigzag pattern with 4 rows.

### Example 3
**Input:** s = "A", numRows = 1
**Output:** "A"
**Explanation:** Single character.

## Constraints

- 1 <= s.length <= 1000
- s consists of English letters (lower-case and upper-case), "," and ".".
- 1 <= numRows <= 1000



## Hints

**Level 1:** Simulate the zigzag pattern with direction changes

**Level 2:** Use an array of strings for each row

## Links

- [LeetCode Problem](https://leetcode.com/problems/zigzag-conversion/)

## Notes

- Use `lct test zigzag-conversion` to run tests
- Use `lct hint zigzag-conversion` for hints
- Use `lct open zigzag-conversion` to open in browser