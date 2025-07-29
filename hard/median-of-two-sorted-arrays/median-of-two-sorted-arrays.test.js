// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const findMedianSortedArrays = require('./median-of-two-sorted-arrays');

describe('4. Median of Two Sorted Arrays', () => {
  // ✅ merged array = [1,2,3] and median is 2. (basic)
  test('merged array = [1,2,3] and median is 2.', () => {
    const result = findMedianSortedArrays("[1", [2]);
    expect(result).toEqual(2);
  });

  // ✅ merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5. (basic)
  test('merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.', () => {
    const result = findMedianSortedArrays("[1", "[3");
    expect(result).toEqual(2.5);
  });

  // ✅ Odd total length (basic)
  test('Odd total length', () => {
    const result = findMedianSortedArrays([1,3], [2]);
    expect(result).toEqual(2);
  });

  // ✅ Even total length (basic)
  test('Even total length', () => {
    const result = findMedianSortedArrays([1,2], [3,4]);
    expect(result).toEqual(2.5);
  });

  // ⚠️ One empty array (edge)
  test('One empty array', () => {
    const result = findMedianSortedArrays([], [1]);
    expect(result).toEqual(1);
  });

  // ⚠️ Other empty array (edge)
  test('Other empty array', () => {
    const result = findMedianSortedArrays([2], []);
    expect(result).toEqual(2);
  });

  // ⚠️ Minimum value: 0 (edge)
  test('Minimum value: 0', () => {
    const result = findMedianSortedArrays(0);
    // Expected result: null
  });

  // ⚠️ Maximum value: 1000 (edge)
  test('Maximum value: 1000', () => {
    const result = findMedianSortedArrays(1000);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Median of Two Sorted Arrays...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  findMedianSortedArrays,
  runAllTests
};