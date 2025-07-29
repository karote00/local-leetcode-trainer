const preorderTraversal = require('./binary-tree-preorder-traversal');

describe('144. Binary Tree Preorder Traversal', () => {
  // ✅ Preorder traversal: root, left, right. (basic)
  test('Preorder traversal: root, left, right.', () => {
    const result = preorderTraversal("[1");
    expect(result).toEqual([1,2,3]);
  });

  // ✅ Empty tree. (basic)
  test('Empty tree.', () => {
    const result = preorderTraversal([]);
    expect(result).toEqual([]);
  });

  // ✅ Single node. (basic)
  test('Single node.', () => {
    const result = preorderTraversal([1]);
    expect(result).toEqual([1]);
  });

  // ✅ Standard tree (basic)
  test('Standard tree', () => {
    const result = preorderTraversal([1,null,2,3]);
    expect(result).toEqual([1,2,3]);
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Binary Tree Preorder Traversal...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  preorderTraversal,
  runAllTests
};