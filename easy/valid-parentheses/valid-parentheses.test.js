const isValid = require('./valid-parentheses');

describe('20. Valid Parentheses', () => {
  // ✅ Valid parentheses. (basic)
  test('Valid parentheses.', () => {
    const result = isValid("()");
    expect(result).toEqual(true);
  });

  // ✅ All brackets are properly closed. (basic)
  test('All brackets are properly closed.', () => {
    const result = isValid("()[]{}");
    expect(result).toEqual(true);
  });

  // ✅ Mismatched brackets. (basic)
  test('Mismatched brackets.', () => {
    const result = isValid("(]");
    expect(result).toEqual(false);
  });

  // ⚠️ Minimum array length (edge)
  test('Minimum array length', () => {
    const result = isValid([1]);
    // Expected result: null
  });

  // ⚠️ Single character string (edge)
  test('Single character string', () => {
    const result = isValid("a");
    // Expected result: null
  });

  // ⚠️ Long string (edge)
  test('Long string', () => {
    const result = isValid("aaaaaaaaaa");
    // Expected result: null
  });

  // 🔥 Large array with 10 elements (stress)
  test('Large array with 10 elements', () => {
    const result = isValid([1,2,3,4,5,6,7,8,9,10]);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Valid Parentheses...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  isValid,
  runAllTests
};