// 📱 OFFLINE MODE: This test file uses fallback problem data
// For the latest version, try again when online

const longestCommonPrefix = require('./longest-common-prefix');

describe('14. Longest Common Prefix', () => {
  // ✅ Example test case (basic)
  test('Example test case', () => {
    const result = longestCommonPrefix("[\"flower");
    expect(result).toEqual("fl");
  });

  // ✅ There is no common prefix among the input strings. (basic)
  test('There is no common prefix among the input strings.', () => {
    const result = longestCommonPrefix("[\"dog");
    expect(result).toEqual("");
  });

  // ⚠️ Minimum array length (edge)
  test('Minimum array length', () => {
    const result = longestCommonPrefix([1]);
    // Expected result: null
  });

  // ⚠️ Single character string (edge)
  test('Single character string', () => {
    const result = longestCommonPrefix("a");
    // Expected result: null
  });

  // ⚠️ Long string (edge)
  test('Long string', () => {
    const result = longestCommonPrefix("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // Expected result: null
  });

  // 🔥 Large array with 200 elements (stress)
  test('Large array with 200 elements', () => {
    const result = longestCommonPrefix([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200]);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Longest Common Prefix...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  longestCommonPrefix,
  runAllTests
};