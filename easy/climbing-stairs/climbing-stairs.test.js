const climbStairs = require('./climbing-stairs');

describe('70. Climbing Stairs', () => {
  // ✅ There are two ways: 1. 1 step + 1 step 2. 2 steps (basic)
  test('There are two ways: 1. 1 step + 1 step 2. 2 steps', () => {
    const result = climbStairs(2);
    expect(result).toEqual(2);
  });

  // ✅ There are three ways: 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step (basic)
  test('There are three ways: 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step', () => {
    const result = climbStairs(3);
    expect(result).toEqual(3);
  });

  // ⚠️ One step (edge)
  test('One step', () => {
    const result = climbStairs(1);
    expect(result).toEqual(1);
  });

  // ⚠️ Maximum value: 45 (edge)
  test('Maximum value: 45', () => {
    const result = climbStairs(45);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Climbing Stairs...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  climbStairs,
  runAllTests
};