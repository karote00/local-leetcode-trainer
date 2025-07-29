const maxProfit = require('./best-time-to-buy-and-sell-stock');

describe('121. Best Time to Buy and Sell Stock', () => {
  // ✅ Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. (basic)
  test('Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.', () => {
    const result = maxProfit("[7");
    expect(result).toEqual(5);
  });

  // ✅ Standard case (basic)
  test('Standard case', () => {
    const result = maxProfit([7,1,5,3,6,4]);
    expect(result).toEqual(5);
  });

  // ⚠️ Decreasing prices (edge)
  test('Decreasing prices', () => {
    const result = maxProfit([7,6,4,3,1]);
    expect(result).toEqual(0);
  });

  // ⚠️ Minimum array length (edge)
  test('Minimum array length', () => {
    const result = maxProfit([-43]);
    // Expected result: null
  });

  // 🔥 Large array with 10 elements (stress)
  test('Large array with 10 elements', () => {
    const result = maxProfit([7,33,-22,-16,13,43,38,14,-34,-2]);
    // Expected result: null
  });
});

// Additional test utilities
function runAllTests() {
  console.log('Running all tests for Best Time to Buy and Sell Stock...');
  // Add custom test runner logic here
}

// Export for external test runners
module.exports = {
  maxProfit,
  runAllTests
};