# 144. Binary Tree Preorder Traversal

**Difficulty:** Easy
**Topics:** Stack, Tree, Depth-First Search, Binary Tree
**Companies:** Amazon, Microsoft, Facebook

## Problem Description

Given the root of a binary tree, return the preorder traversal of its nodes' values.

## Examples

### Example 1
**Input:** root = [1,null,2,3]
**Output:** [1,2,3]
**Explanation:** Preorder traversal: root, left, right.

### Example 2
**Input:** root = []
**Output:** []
**Explanation:** Empty tree.

### Example 3
**Input:** root = [1]
**Output:** [1]
**Explanation:** Single node.

## Constraints

- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100



## Hints

**Level 1:** Use recursion or stack for iterative approach

**Level 2:** Preorder: root, left subtree, right subtree

## Links

- [LeetCode Problem](https://leetcode.com/problems/binary-tree-preorder-traversal/)

## Notes

- Use `lct test binary-tree-preorder-traversal` to run tests
- Use `lct hint binary-tree-preorder-traversal` for hints
- Use `lct open binary-tree-preorder-traversal` to open in browser