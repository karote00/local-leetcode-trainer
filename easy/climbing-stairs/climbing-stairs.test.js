// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const climbStairs = require('./climbing-stairs');

describe('70. Climbing Stairs', () => {
  // ✅ There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps (basic)
  test('There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps', () => {
    const result = climbStairs(2);
    expect(result).toEqual(2);
  });

  // ✅ There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step (basic)
  test('There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step', () => {
    const result = climbStairs(3);
    expect(result).toEqual(3);
  });

  // ✅ Four steps (basic)
  test('Four steps', () => {
    const result = climbStairs(4);
    expect(result).toEqual(5);
  });

  // ⚠️ One step (edge)
  test('One step', () => {
    const result = climbStairs(1);
    expect(result).toEqual(1);
  });

  // ⚠️ Five steps (edge)
  test('Five steps', () => {
    const result = climbStairs(5);
    expect(result).toEqual(8);
  });

  // ⚠️ Ten steps (edge)
  test('Ten steps', () => {
    const result = climbStairs(10);
    expect(result).toEqual(89);
  });

  // 🔥 Maximum constraint (stress)
  test('Maximum constraint', () => {
    const result = climbStairs(45);
    expect(result).toEqual(1836311903);
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