// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const twoSum = require('./two-sum');

describe('1. Two Sum', () => {
  // ✅ Because nums[0] + nums[1] == 9, we return [0, 1]. (basic)
  test('Because nums[0] + nums[1] == 9, we return [0, 1].', () => {
    const result = twoSum("[2", 9);
    expect(result).toEqual([0,1]);
  });

  // ✅ Because nums[1] + nums[2] == 6, we return [1, 2]. (basic)
  test('Because nums[1] + nums[2] == 6, we return [1, 2].', () => {
    const result = twoSum("[3", 6);
    expect(result).toEqual([1,2]);
  });

  // ✅ Basic case with solution at beginning (basic)
  test('Basic case with solution at beginning', () => {
    const result = twoSum([2,7,11,15], 9);
    expect(result).toEqual([0,1]);
  });

  // ✅ Basic case with solution at end (basic)
  test('Basic case with solution at end', () => {
    const result = twoSum([3,2,4], 6);
    expect(result).toEqual([1,2]);
  });

  // ✅ Duplicate numbers (basic)
  test('Duplicate numbers', () => {
    const result = twoSum([3,3], 6);
    expect(result).toEqual([0,1]);
  });

  // ⚠️ All negative numbers (edge)
  test('All negative numbers', () => {
    const result = twoSum([-1,-2,-3,-4,-5], -8);
    expect(result).toEqual([2,4]);
  });

  // ⚠️ Target is zero (edge)
  test('Target is zero', () => {
    const result = twoSum([0,4,3,0], 0);
    expect(result).toEqual([0,3]);
  });

  // ⚠️ Negative and positive sum to zero (edge)
  test('Negative and positive sum to zero', () => {
    const result = twoSum([-3,4,3,90], 0);
    expect(result).toEqual([0,2]);
  });

  // 🔥 Large array (stress)
  test('Large array', () => {
    const result = twoSum([1,2,3,4,5,6,7,8,9,10], 19);
    expect(result).toEqual([8,9]);
  });

  // ⚠️ Minimum array length (edge)
  test('Minimum array length', () => {
    const result = twoSum([12]);
    // Expected result: null
  });

  // ⚠️ Minimum value: 9 (edge)
  test('Minimum value: 9', () => {
    const result = twoSum(9);
    // Expected result: null
  });

  // ⚠️ Maximum value: 10 (edge)
  test('Maximum value: 10', () => {
    const result = twoSum(10);
    // Expected result: null
  });

  // 🔥 Large array with 10 elements (stress)
  test('Large array with 10 elements', () => {
    const result = twoSum([19,-27,20,30,36,-11,-15,25,38,-19]);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Two Sum...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  twoSum,
  runAllTests
};