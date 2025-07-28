// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const romanToInt = require('./roman-to-integer');

describe('13. Roman to Integer', () => {
  // ✅ III = 3. (basic)
  test('III = 3.', () => {
    const result = romanToInt("III");
    expect(result).toEqual(3);
  });

  // ✅ L = 50, V= 5, III = 3. (basic)
  test('L = 50, V= 5, III = 3.', () => {
    const result = romanToInt("LVIII");
    expect(result).toEqual(58);
  });

  // ✅ M = 1000, CM = 900, XC = 90. (basic)
  test('M = 1000, CM = 900, XC = 90.', () => {
    const result = romanToInt("MCMXC");
    expect(result).toEqual(1994);
  });

  // ⚠️ Minimum array length (edge)
  test('Minimum array length', () => {
    const result = romanToInt([1]);
    // Expected result: null
  });

  // ⚠️ Single character string (edge)
  test('Single character string', () => {
    const result = romanToInt("a");
    // Expected result: null
  });

  // ⚠️ Long string (edge)
  test('Long string', () => {
    const result = romanToInt("aaaaaaaaaaaaaaa");
    // Expected result: null
  });

  // 🔥 Large array with 15 elements (stress)
  test('Large array with 15 elements', () => {
    const result = romanToInt([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Roman to Integer...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  romanToInt,
  runAllTests
};