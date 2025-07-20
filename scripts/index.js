// Main entry point for Local LeetCode Trainer
// This file exports the core functionality for programmatic use

const { getCurrentLanguage, getLanguageConfig, LANGUAGE_CONFIGS } = require('./config.js');

module.exports = {
  // Configuration
  getCurrentLanguage,
  getLanguageConfig,
  LANGUAGE_CONFIGS,
  
  // Core functionality
  challenge: require('./challenge.js'),
  testRunner: require('./test-runner.js'),
  openProblem: require('./open-problem.js'),
  complete: require('./complete.js'),
  
  // Utility functions
  version: require('../package.json').version,
  
  // CLI info
  info: {
    name: 'Local LeetCode Trainer',
    description: 'A complete offline LeetCode practice environment with multi-language support',
    repository: 'https://github.com/username/local-leetcode-trainer'
  }
};