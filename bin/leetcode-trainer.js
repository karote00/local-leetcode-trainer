#!/usr/bin/env node

const { Command } = require('commander');
const { spawn } = require('child_process');
const path = require('path');
const packageJson = require('../package.json');

const program = new Command();

// Check if using deprecated command and show warning
const isDeprecatedCommand = process.argv[1].includes('leetcode-trainer') && !process.argv[1].includes('local-leetcode-trainer');
if (isDeprecatedCommand) {
  console.log('⚠️  DEPRECATION WARNING: "leetcode-trainer" command is deprecated.');
  console.log('💡 Please use "local-leetcode-trainer" or "lct" instead.');
  console.log('');
}

// Configure the main program
program
  .name('local-leetcode-trainer')
  .description('🎯 A complete local LeetCode practice environment with multi-language support')
  .version(packageJson.version, '-v, --version', 'Show version number')
  .helpOption('-h, --help', 'Show this help message');

// Helper function to execute scripts
function executeScript(scriptName, args = []) {
  const scriptPath = path.join(__dirname, '..', 'scripts', scriptName);
  const child = spawn('node', [scriptPath, ...args], {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  child.on('exit', (code) => {
    process.exit(code);
  });
}

// Challenge command
program
  .command('challenge')
  .alias('c')
  .description('Generate new LeetCode problems')
  .argument('<difficulty>', 'Problem difficulty (easy/medium/hard)')
  .argument('[count]', 'Number of problems to generate', '1')
  .action((difficulty, count) => {
    executeScript('challenge.js', [difficulty, count]);
  });

// Test command
program
  .command('test')
  .description('Run tests for a problem')
  .argument('[problem]', 'Problem to test (e.g., easy/two-sum)')
  .action((problem) => {
    executeScript('test-runner.js', problem ? [problem] : []);
  });

// Open command
program
  .command('open')
  .description('Open LeetCode problem in browser')
  .argument('[problem]', 'Problem to open (e.g., easy/two-sum)')
  .action((problem) => {
    executeScript('open-problem.js', problem ? [problem] : []);
  });

// Complete command
program
  .command('complete')
  .description('Mark problem as completed or manage completion')
  .argument('[action]', 'Action: problem-path, "list", or "undo problem-path"')
  .argument('[problem]', 'Problem path for undo action')
  .action((action, problem) => {
    const args = problem ? [action, problem] : (action ? [action] : []);
    executeScript('complete.js', args);
  });

// Language command
program
  .command('lang')
  .alias('config')
  .description('Show or change programming language')
  .argument('[language]', 'Language to switch to (javascript/python/java/cpp)')
  .action((language) => {
    executeScript('config.js', language ? [language] : []);
  });

// Hint command
program
  .command('hint')
  .description('Get progressive hints for a problem')
  .argument('<problem>', 'Problem to get hints for (e.g., easy/two-sum)')
  .argument('[level]', 'Hint level (1-4)', '1')
  .action((problem, level) => {
    executeScript('hint.js', ['hint', problem, level]);
  });

// Learn command
program
  .command('learn')
  .description('Show algorithm approaches and complexity analysis')
  .argument('<problem>', 'Problem to learn about (e.g., easy/two-sum)')
  .action((problem) => {
    executeScript('hint.js', ['learn', problem]);
  });

// Patterns command
program
  .command('patterns')
  .description('List all available algorithm patterns')
  .action(() => {
    executeScript('hint.js', ['patterns']);
  });

// Init command
program
  .command('init')
  .description('Initialize LeetCode practice environment')
  .action(() => {
    executeScript('init.js');
  });

// Show welcome message when no command is given
if (process.argv.length === 2) {
  console.log('🎯 Welcome to Local LeetCode Trainer!\n');
  console.log('🚀 Quick start: lct challenge easy');
  console.log('📚 Get help: lct --help');
  console.log('🧠 Learn: lct patterns\n');
}

// Handle unknown commands
program.on('command:*', () => {
  console.error('❌ Unknown command: %s\n', program.args.join(' '));
  console.log('💡 See "lct --help" for available commands');
  process.exit(1);
});

// Parse command line arguments
program.parse();