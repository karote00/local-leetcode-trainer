#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get command and arguments
const [,, command, ...args] = process.argv;

// Map of commands to script files
const commands = {
  'challenge': 'challenge.js',
  'test': 'test-runner.js',
  'open': 'open-problem.js',
  'complete': 'complete.js',
  'lang': 'config.js',
  'config': 'config.js',
  'hint': 'hint.js',
  'learn': 'hint.js',
  'patterns': 'hint.js'
};

// Show help if no command or invalid command
if (!command || !commands[command]) {
  console.log(`
🎯 Local LeetCode Trainer CLI

Usage: leetcode-trainer <command> [options]
   or: lct <command> [options]

Commands:
  challenge <difficulty>     Generate new problem (easy/medium/hard)
  test <problem>            Run tests for a problem
  open <problem>            Open LeetCode link in browser
  complete <problem>        Mark problem as completed
  lang [language]           Show/change language (js/python/java/cpp)
  hint <problem> [level]    Get progressive hints for a problem
  learn <problem>           Show algorithm approaches and patterns
  patterns                  List all available algorithm patterns

Examples:
  leetcode-trainer challenge easy
  lct test easy/two-sum
  lct lang python
  lct complete easy/two-sum
  lct hint easy/two-sum
  lct hint easy/two-sum 2
  lct learn easy/two-sum
  lct patterns

For more help: https://github.com/karote00/local-leetcode-trainer
`);
  process.exit(command ? 1 : 0);
}

// Execute the corresponding script
const scriptPath = path.join(__dirname, '..', 'scripts', commands[command]);
const child = spawn('node', [scriptPath, ...args], {
  stdio: 'inherit',
  cwd: process.cwd()
});

child.on('exit', (code) => {
  process.exit(code);
});