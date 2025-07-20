#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎯 Setting up Local LeetCode Trainer...');

// Create initial directory structure
const directories = ['easy', 'medium', 'hard'];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created ${dir}/ directory`);
  }
});

// Create config file if it doesn't exist
const configPath = '.leetcode-config.json';
if (!fs.existsSync(configPath)) {
  const defaultConfig = {
    language: 'javascript',
    companies: [],
    createdAt: new Date().toISOString()
  };
  
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log('✅ Created configuration file');
}

console.log(`
🎉 Local LeetCode Trainer is ready!

Quick start:
  leetcode-trainer challenge easy    # Get your first problem
  lct lang python                   # Switch to Python
  lct test easy/problem-name        # Test your solution

For help: leetcode-trainer --help
`);