// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const isValid = require('./valid-parentheses');

describe('20. Valid Parentheses', () => {
  // ✅ The string contains valid parentheses. (basic)
  test('The string contains valid parentheses.', () => {
    const result = isValid("()");
    expect(result).toEqual(true);
  });

  // ✅ The string contains valid combinations of all bracket types. (basic)
  test('The string contains valid combinations of all bracket types.', () => {
    const result = isValid("()[]{}");
    expect(result).toEqual(true);
  });

  // ✅ The brackets are not properly matched. (basic)
  test('The brackets are not properly matched.', () => {
    const result = isValid("(]");
    expect(result).toEqual(false);
  });

  // ⚠️ Empty string (edge)
  test('Empty string', () => {
    const result = isValid("");
    expect(result).toEqual(true);
  });

  // ⚠️ Single opening bracket (edge)
  test('Single opening bracket', () => {
    const result = isValid("(");
    expect(result).toEqual(false);
  });

  // ⚠️ Single closing bracket (edge)
  test('Single closing bracket', () => {
    const result = isValid(")");
    expect(result).toEqual(false);
  });

  // 🔥 Many opening brackets (stress)
  test('Many opening brackets', () => {
    const result = isValid("((((((((((");
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