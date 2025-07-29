module.exports = {
  id: 62,
  title: 'Unique Paths',
  name: 'unique-paths',
  difficulty: 'medium',
  description: 'There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.',
  examples: [
    { input: 'm = 3, n = 7', output: '28', explanation: 'There are 28 unique paths from top-left to bottom-right.' },
    { input: 'm = 3, n = 2', output: '3', explanation: 'From the top-left corner, there are a total of 3 ways to reach the bottom-right corner: 1. Right -> Down -> Down 2. Down -> Down -> Right 3. Down -> Right -> Down' }
  ],
  constraints: ['1 <= m, n <= 100'],
  topics: ['Math', 'Dynamic Programming', 'Combinatorics'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'uniquePaths', params: [{ name: 'm', type: 'number' }, { name: 'n', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [3, 7], expected: 28, description: '3x7 grid', category: 'basic' },
    { input: [3, 2], expected: 3, description: '3x2 grid', category: 'basic' },
    { input: [1, 1], expected: 1, description: 'Single cell', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use DP: dp[i][j] = dp[i-1][j] + dp[i][j-1]', category: 'approach' },
    { level: 2, text: 'Or use combinatorics: C(m+n-2, m-1)', category: 'math' }
  ]
};