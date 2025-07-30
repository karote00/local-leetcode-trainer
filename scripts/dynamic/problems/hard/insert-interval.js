module.exports = {
  id: 57,
  title: 'Insert Interval',
  name: 'insert-interval',
  difficulty: 'hard',
  description: 'You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).',
  examples: [
    { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]', explanation: 'The new interval [2,5] overlaps with [1,3], so they merge to [1,5].' },
    { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]', explanation: 'The new interval [4,8] overlaps with [3,5],[6,7],[8,10].' }
  ],
  constraints: [
    '0 <= intervals.length <= 10^4',
    'intervals[i].length == 2',
    '0 <= starti <= endi <= 10^5',
    'intervals is sorted by starti in ascending order.',
    'newInterval.length == 2',
    '0 <= start <= end <= 10^5'
  ],
  topics: ['Array'],
  companies: ['Google', 'Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'insert', params: [{ name: 'intervals', type: 'number[][]' }, { name: 'newInterval', type: 'number[]' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [[[1,3],[6,9]], [2,5]], expected: [[1,5],[6,9]], description: 'Merge with one interval', category: 'basic' },
    { input: [[[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]], expected: [[1,2],[3,10],[12,16]], description: 'Merge with multiple intervals', category: 'basic' },
    { input: [[], [5,7]], expected: [[5,7]], description: 'Empty intervals', category: 'edge' },
    { input: [[[1,5]], [6,8]], expected: [[1,5],[6,8]], description: 'No overlap', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Process intervals in three phases: before, overlapping, after', category: 'approach' },
    { level: 2, text: 'Merge all overlapping intervals with the new interval', category: 'implementation' }
  ]
};