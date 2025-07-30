module.exports = {
  id: 207,
  title: 'Course Schedule',
  name: 'course-schedule',
  difficulty: 'medium',
  description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.',
  examples: [
    { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.' },
    { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.' }
  ],
  constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', '0 <= ai, bi < numCourses', 'All the pairs prerequisites[i] are unique.'],
  topics: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'canFinish', params: [{ name: 'numCourses', type: 'number' }, { name: 'prerequisites', type: 'number[][]' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [2, [[1,0]]], expected: true, description: 'No cycle', category: 'basic' },
    { input: [2, [[1,0],[0,1]]], expected: false, description: 'Has cycle', category: 'basic' },
    { input: [1, []], expected: true, description: 'Single course', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'This is cycle detection in directed graph', category: 'approach' },
    { level: 2, text: 'Use DFS with three states: unvisited, visiting, visited', category: 'dfs' }
  ]
};