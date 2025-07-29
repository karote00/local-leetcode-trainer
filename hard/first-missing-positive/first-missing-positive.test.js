const firstMissingPositive = require('./first-missing-positive');

describe('41. First Missing Positive', () => {
  // ✅ The numbers in the range [1,2] are all in the array. (basic)
  test('The numbers in the range [1,2] are all in the array.', () => {
    const result = firstMissingPositive("[1");
    expect(result).toEqual(3);
  });

  // ✅ The number 2 is missing. (basic)
  test('The number 2 is missing.', () => {
    const result = firstMissingPositive("[3");
    expect(result).toEqual(2);
  });

  // ✅ The smallest positive integer 1 is missing. (basic)
  test('The smallest positive integer 1 is missing.', () => {
    const result = firstMissingPositive("[7");
    expect(result).toEqual(1);
  });

  // ✅ Missing positive (basic)
  test('Missing positive', () => {
    const result = firstMissingPositive([1,2,0]);
    expect(result).toEqual(3);
  });

  // ✅ Unsorted with negatives (basic)
  test('Unsorted with negatives', () => {
    const result = firstMissingPositive([3,4,-1,1]);
    expect(result).toEqual(2);
  });

  // ⚠️ All large numbers (edge)
  test('All large numbers', () => {
    const result = firstMissingPositive([7,8,9,11,12]);
    expect(result).toEqual(1);
  });

  // ⚠️ Minimum array length (edge)
  test('Minimum array length', () => {
    const result = firstMissingPositive([7]);
    // Expected result: null
  });

  // 🔥 Large array with 10 elements (stress)
  test('Large array with 10 elements', () => {
    const result = firstMissingPositive([45,-3,-35,-24,-17,-39,-37,8,25,47]);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for First Missing Positive...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  firstMissingPositive,
  runAllTests
};