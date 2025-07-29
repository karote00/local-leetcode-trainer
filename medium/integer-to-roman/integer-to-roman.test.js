const intToRoman = require('./integer-to-roman');

describe('12. Integer to Roman', () => {
  // ✅ 3 is represented as III in roman numerals. (basic)
  test('3 is represented as III in roman numerals.', () => {
    const result = intToRoman(3);
    expect(result).toEqual("III");
  });

  // ✅ L = 50, V = 5, III = 3. (basic)
  test('L = 50, V = 5, III = 3.', () => {
    const result = intToRoman(58);
    expect(result).toEqual("LVIII");
  });

  // ✅ M = 1000, CM = 900, XC = 90 and IV = 4. (basic)
  test('M = 1000, CM = 900, XC = 90 and IV = 4.', () => {
    const result = intToRoman(1994);
    expect(result).toEqual("MCMXCIV");
  });

  // ⚠️ Minimum value: 1 (edge)
  test('Minimum value: 1', () => {
    const result = intToRoman(1);
    // Expected result: null
  });

  // ⚠️ Maximum value: 3999 (edge)
  test('Maximum value: 3999', () => {
    const result = intToRoman(3999);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Integer to Roman...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  intToRoman,
  runAllTests
};