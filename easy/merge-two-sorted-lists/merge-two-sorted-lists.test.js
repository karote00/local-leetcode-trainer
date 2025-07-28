// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const mergeTwoLists = require('./merge-two-sorted-lists');

describe('21. Merge Two Sorted Lists', () => {
  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = mergeTwoLists("[1", "[1");
    expect(result).toEqual([1,1,2,3,4,4]);
  });

  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = mergeTwoLists([], []);
    expect(result).toEqual([]);
  });

  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = mergeTwoLists([], [0]);
    expect(result).toEqual([0]);
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Merge Two Sorted Lists...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  mergeTwoLists,
  runAllTests
};