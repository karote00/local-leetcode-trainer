const isPalindrome = require('./palindrome-number');

describe('9. Palindrome Number', () => {
  // ✅ 121 reads the same backward as forward. (basic)
  test('121 reads the same backward as forward.', () => {
    const result = isPalindrome(121);
    expect(result).toEqual(true);
  });

  // ✅ From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome. (basic)
  test('From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.', () => {
    const result = isPalindrome(-121);
    expect(result).toEqual(false);
  });

  // ✅ Reads 01 from right to left. Therefore it is not a palindrome. (basic)
  test('Reads 01 from right to left. Therefore it is not a palindrome.', () => {
    const result = isPalindrome(10);
    expect(result).toEqual(false);
  });

  // ⚠️ Single digit (edge)
  test('Single digit', () => {
    const result = isPalindrome(0);
    expect(result).toEqual(true);
  });

  // ⚠️ Minimum value: 31 (edge)
  test('Minimum value: 31', () => {
    const result = isPalindrome(31);
    // Expected result: null
  });

  // ⚠️ Maximum value: 2 (edge)
  test('Maximum value: 2', () => {
    const result = isPalindrome(2);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Palindrome Number...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  isPalindrome,
  runAllTests
};