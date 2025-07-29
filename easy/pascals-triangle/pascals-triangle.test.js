const generate = require('./pascals-triangle');

describe('118. Pascal's Triangle', () => {
  // ✅ Pascal's triangle with 5 rows. (basic)
  test('Pascal's triangle with 5 rows.', () => {
    const result = generate(5);
    expect(result).toEqual([[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]);
  });

  // ✅ Single row. (basic)
  test('Single row.', () => {
    const result = generate(1);
    expect(result).toEqual([[1]]);
  });

  // ⚠️ Maximum value: 30 (edge)
  test('Maximum value: 30', () => {
    const result = generate(30);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Pascal's Triangle...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  generate,
  runAllTests
};