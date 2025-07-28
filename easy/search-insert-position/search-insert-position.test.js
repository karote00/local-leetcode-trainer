// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const searchInsert = require('./search-insert-position');

describe('35. Search Insert Position', () => {
  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = searchInsert("[1", 5);
    expect(result).toEqual(2);
  });

  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = searchInsert("[1", 2);
    expect(result).toEqual(1);
  });

  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = searchInsert("[1", 7);
    expect(result).toEqual(4);
  });

  // ⚠️ Minimum array length (edge)
  test('Minimum array length', () => {
    const result = searchInsert([-50]);
    // Expected result: null
  });

  // 🔥 Large array with 10 elements (stress)
  test('Large array with 10 elements', () => {
    const result = searchInsert([-32,-22,26,-26,-24,23,33,-11,48,-39]);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Search Insert Position...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  searchInsert,
  runAllTests
};