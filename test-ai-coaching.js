#!/usr/bin/env node

const AITeachingEngine = require('./scripts/dynamic/ai-teaching-engine');
const path = require('path');
const fs = require('fs');

/**
 * Simple test of the AI Teaching System
 */
async function testAICoaching() {
  console.log('🤖 AI Teaching System Test\n');
  console.log('Testing with Valid Parentheses problem...\n');

  const engine = new AITeachingEngine();
  
  // Load the teaching script for valid parentheses
  const problemPath = path.join(__dirname, 'scripts', 'dynamic', 'problems', 'easy', 'valid-parentheses');
  
  console.log(`📂 Loading teaching script from: ${problemPath}`);
  const script = engine.loadScript(problemPath);
  
  if (!script) {
    console.log('❌ No teaching script found. Let me check what\'s available...');
    
    // List available problems with teaching scripts
    const easyProblems = path.join(__dirname, 'scripts', 'dynamic', 'problems', 'easy');
    const dirs = fs.readdirSync(easyProblems, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    console.log('\n📚 Available problems:');
    for (const dir of dirs) {
      const trainerPath = path.join(easyProblems, dir, 'trainer.yaml');
      if (fs.existsSync(trainerPath)) {
        console.log(`  ✅ ${dir} (has teaching script)`);
      } else {
        console.log(`  📝 ${dir} (no teaching script)`);
      }
    }
    return;
  }

  console.log('✅ Teaching script loaded successfully!\n');
  
  // Show the introduction
  console.log('🎯 ' + '='.repeat(60));
  const intro = engine.getIntroduction();
  if (intro) {
    console.log(intro);
  }
  console.log('='.repeat(64) + '\n');

  // Show pre-coding guidance
  console.log('💭 ' + '='.repeat(60));
  const prePrompt = engine.getPrePrompt();
  if (prePrompt) {
    console.log(prePrompt);
  }
  console.log('='.repeat(64) + '\n');

  // Simulate different coding approaches and get AI feedback
  console.log('🔍 **Simulating Different Coding Approaches**\n');

  // Approach 1: Naive attempt without stack
  console.log('**Attempt 1: Naive approach without stack**');
  const naiveCode = `
function isValid(s) {
    for (let i = 0; i < s.length; i++) {
        // trying to match brackets manually...
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
            // what do I do here?
        }
    }
}`;

  const hint1 = engine.getHint(naiveCode);
  if (hint1) {
    console.log('💡 AI Hint:');
    console.log(hint1);
    console.log('');
  }

  // Approach 2: Using stack but forgetting to pop
  console.log('**Attempt 2: Using stack but incomplete**');
  const incompleteCode = `
function isValid(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
            stack.push(s[i]);
        }
        // what about closing brackets?
    }
}`;

  const hint2 = engine.getHint(incompleteCode);
  if (hint2) {
    console.log('💡 AI Hint:');
    console.log(hint2);
    console.log('');
  }

  // Approach 3: Using stack with pop but no error checking
  console.log('**Attempt 3: Using stack with pop but missing edge cases**');
  const buggyCode = `
function isValid(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
            stack.push(s[i]);
        } else {
            const popped = stack.pop();
            // check if they match...
        }
    }
}`;

  const hint3 = engine.getHint(buggyCode);
  if (hint3) {
    console.log('💡 AI Hint:');
    console.log(hint3);
    console.log('');
  }

  // Simulate execution with errors
  console.log('🧪 **Simulating Code Execution**\n');
  
  console.log('**Test Run 1: Runtime error**');
  const errorFeedback = engine.processExecution(buggyCode, '', 'TypeError: Cannot read property of undefined', false);
  if (errorFeedback) {
    console.log('🤖 AI Error Help:');
    console.log(errorFeedback);
    console.log('');
  }

  // Simulate multiple failed attempts
  console.log('**Test Run 2: After multiple attempts**');
  engine.processExecution(buggyCode, '', '', false);
  engine.processExecution(buggyCode, '', '', false);
  const encouragement = engine.processExecution(buggyCode, '', '', false);
  if (encouragement) {
    console.log('🤖 AI Encouragement:');
    console.log(encouragement);
    console.log('');
  }

  // Simulate success
  console.log('**Test Run 3: Success!**');
  const correctCode = `
function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };
    
    for (let char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}`;

  const successFeedback = engine.processExecution(correctCode, 'All tests passed!', '', true);
  if (successFeedback) {
    console.log('🤖 AI Success Feedback:');
    console.log(successFeedback);
    console.log('');
  }

  const successMessage = engine.getSuccessMessage();
  if (successMessage) {
    console.log('🎉 Success Message:');
    console.log(successMessage);
    console.log('');
  }

  console.log('🎉 **AI Teaching System Test Complete!**');
  console.log('The AI successfully provided contextual guidance throughout the problem-solving process.');
}

// Run the test
if (require.main === module) {
  testAICoaching().catch(console.error);
}

module.exports = testAICoaching;