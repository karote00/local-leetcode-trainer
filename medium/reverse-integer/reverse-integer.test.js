// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const reverse = require('./reverse-integer');

describe('7. Reverse Integer', () => {
  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = reverse(123);
    expect(result).toEqual(321);
  });

  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = reverse(-123);
    expect(result).toEqual(-321);
  });

  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = reverse(120);
    expect(result).toEqual(21);
  });

  // ⚠️ Zero (edge)
  test('Zero', () => {
    const result = reverse(0);
    expect(result).toEqual(0);
  });

  // ⚠️ Overflow case (edge)
  test('Overflow case', () => {
    const result = reverse(1534236469);
    expect(result).toEqual(0);
  });

  // ⚠️ Minimum value: 31 (edge)
  test('Minimum value: 31', () => {
    const result = reverse(31);
    // Expected result: null
  });

  // ⚠️ Maximum value: 2 (edge)
  test('Maximum value: 2', () => {
    const result = reverse(2);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Reverse Integer...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  reverse,
  runAllTests
};