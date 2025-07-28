# 21. Merge Two Sorted Lists

**Difficulty:** Easy
**Topics:** Linked List, Recursion
**Companies:** Amazon, Microsoft, Apple

## 📱 Offline Mode Notice

**This problem data is from the fallback database** because LeetCode API is currently unavailable.

**Limitations:**
- Problem data may not be the most recent version
- Some advanced features may be limited
- Test cases are generated based on available examples

**To get the latest data:** Try again when you have internet connectivity and LeetCode is accessible.

**Completeness Score:** 80%

## Problem Description

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

## Examples

### Example 1
**Input:** list1 = [1,2,4], list2 = [1,3,4]
**Output:** [1,1,2,3,4,4]


### Example 2
**Input:** list1 = [], list2 = []
**Output:** []


### Example 3
**Input:** list1 = [], list2 = [0]
**Output:** [0]


## Constraints

- The number of nodes in both lists is in the range [0, 50]
- -100 <= Node.val <= 100



## Links

- [LeetCode Problem](https://leetcode.com/problems/merge-two-sorted-lists/)

## Notes

- Use `lct test merge-two-sorted-lists` to run tests
- Use `lct hint merge-two-sorted-lists` for hints
- Use `lct open merge-two-sorted-lists` to open in browser