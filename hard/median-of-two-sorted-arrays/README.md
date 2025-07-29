# 4. Median of Two Sorted Arrays

**Difficulty:** Hard
**Topics:** Array, Binary Search, Divide and Conquer
**Companies:** Amazon, Google, Microsoft

## 📱 Offline Mode Notice

**This problem data is from the fallback database** because LeetCode API is currently unavailable.

**Limitations:**
- Problem data may not be the most recent version
- Some advanced features may be limited
- Test cases are generated based on available examples

**To get the latest data:** Try again when you have internet connectivity and LeetCode is accessible.

**Completeness Score:** 90%

## Problem Description

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

## Examples

### Example 1
**Input:** nums1 = [1,3], nums2 = [2]
**Output:** 2.00000
**Explanation:** merged array = [1,2,3] and median is 2.

### Example 2
**Input:** nums1 = [1,2], nums2 = [3,4]
**Output:** 2.50000
**Explanation:** merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

## Constraints

- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10^6 <= nums1[i], nums2[i] <= 10^6



## Hints

**Level 1:** Think about binary search on the smaller array

**Level 2:** Find the correct partition point

**Level 3:** Ensure left partition <= right partition

## Links

- [LeetCode Problem](https://leetcode.com/problems/median-of-two-sorted-arrays/)

## Notes

- Use `lct test median-of-two-sorted-arrays` to run tests
- Use `lct hint median-of-two-sorted-arrays` for hints
- Use `lct open median-of-two-sorted-arrays` to open in browser