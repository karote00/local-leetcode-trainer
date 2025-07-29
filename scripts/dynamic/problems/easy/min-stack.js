module.exports = {
  id: 155,
  title: 'Min Stack',
  name: 'min-stack',
  difficulty: 'easy',
  description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class: MinStack() initializes the stack object. void push(int val) pushes the element val onto the stack. void pop() removes the element on the top of the stack. int top() gets the top element of the stack. int getMin() retrieves the minimum element in the stack. You must implement a solution with O(1) time complexity for each function.',
  examples: [
    { input: '["MinStack","push","push","push","getMin","pop","top","getMin"] [[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]', explanation: 'MinStack minStack = new MinStack(); minStack.push(-2); minStack.push(0); minStack.push(-3); minStack.getMin(); // return -3 minStack.pop(); minStack.top();    // return 0 minStack.getMin(); // return -2' }
  ],
  constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and getMin operations will always be called on non-empty stacks.', 'At most 3 * 10^4 calls will be made to push, pop, top, and getMin.'],
  topics: ['Stack', 'Design'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'MinStack', params: [], returnType: 'void' }
  },
  testCases: [
    { input: [['MinStack','push','push','push','getMin','pop','top','getMin'], [[],[-2],[0],[-3],[],[],[],[]]], expected: [null,null,null,null,-3,null,0,-2], description: 'Basic operations', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use an auxiliary stack to keep track of minimums', category: 'approach' },
    { level: 2, text: 'Or store pairs of (value, current_min) in single stack', category: 'optimization' }
  ]
};