#!/usr/bin/env node

const AITeachingEngine = require('./dynamic/ai-teaching-engine');
const path = require('path');

/**
 * Demo script to showcase the AI Teaching System
 */
async function demoAITeaching() {
  console.log('🤖 AI Teaching System Demo\n');
  console.log('=' .repeat(50));

  const engine = new AITeachingEngine();

  // Demo 1: Two Sum (Easy)
  console.log('\n📚 Demo 1: Two Sum (Easy Problem)');
  console.log('-'.repeat(40));
  
  const twoSumPath = path.join(__dirname, 'dynamic', 'problems', 'easy', 'two-sum');
  const script1 = engine.loadScript(twoSumPath);
  
  if (script1) {
    console.log('✅ Teaching script loaded successfully!');
    console.log('\n🎯 Introduction:');
    console.log(engine.getIntroduction());
    
    console.log('\n💭 Pre-coding guidance:');
    console.log(engine.getPrePrompt());
    
    // Simulate code analysis
    const bruteForceCode = `
function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}`;
    
    console.log('\n🔍 Analyzing brute force approach...');
    const hint1 = engine.getHint(bruteForceCode);
    if (hint1) {
      console.log('💡 AI Hint:');
      console.log(hint1);
    }
    
    // Simulate execution feedback
    console.log('\n🧪 Simulating test execution...');
    const feedback = engine.processExecution(bruteForceCode, 'Test passed', '', true);
    if (feedback) {
      console.log('🤖 AI Feedback:');
      console.log(feedback);
    }
    
    const successMsg = engine.getSuccessMessage();
    if (successMsg) {
      console.log('\n🎉 Success Message:');
      console.log(successMsg);
    }
  } else {
    console.log('❌ No teaching script found');
  }

  // Demo 2: Longest Palindromic Substring (Medium)
  console.log('\n\n📚 Demo 2: Longest Palindromic Substring (Medium Problem)');
  console.log('-'.repeat(55));
  
  engine.reset(); // Reset for new problem
  const palindromePath = path.join(__dirname, 'dynamic', 'problems', 'medium', 'longest-palindromic-substring');
  const script2 = engine.loadScript(palindromePath);
  
  if (script2) {
    console.log('✅ Teaching script loaded successfully!');
    console.log('\n🎯 Introduction:');
    console.log(engine.getIntroduction());
    
    // Simulate different code patterns
    const inefficientCode = `
function longestPalindrome(s) {
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            let substring = s.substring(i, j + 1);
            // check if palindrome...
        }
    }
}`;
    
    console.log('\n🔍 Analyzing inefficient approach...');
    const hint2 = engine.getHint(inefficientCode);
    if (hint2) {
      console.log('💡 AI Hint:');
      console.log(hint2);
    }
    
    // Simulate error handling
    console.log('\n🐛 Simulating boundary error...');
    const errorFeedback = engine.processExecution(inefficientCode, '', 'TypeError: Cannot read property', false);
    if (errorFeedback) {
      console.log('🤖 AI Error Help:');
      console.log(errorFeedback);
    }
  } else {
    console.log('❌ No teaching script found');
  }

  // Demo 3: Merge k Sorted Lists (Hard)
  console.log('\n\n📚 Demo 3: Merge k Sorted Lists (Hard Problem)');
  console.log('-'.repeat(45));
  
  engine.reset(); // Reset for new problem
  const mergePath = path.join(__dirname, 'dynamic', 'problems', 'hard', 'merge-k-sorted-lists');
  const script3 = engine.loadScript(mergePath);
  
  if (script3) {
    console.log('✅ Teaching script loaded successfully!');
    console.log('\n🎯 Introduction:');
    console.log(engine.getIntroduction());
    
    console.log('\n💭 Strategic guidance:');
    console.log(engine.getPrePrompt());
    
    // Simulate struggling with the problem
    const strugglingCode = `
function mergeKLists(lists) {
    while (lists.length > 1) {
        // trying to merge but getting confused...
    }
}`;
    
    // Simulate multiple attempts
    engine.processExecution(strugglingCode, '', '', false);
    engine.processExecution(strugglingCode, '', '', false);
    engine.processExecution(strugglingCode, '', '', false);
    
    console.log('\n🤔 After multiple failed attempts...');
    const helpFeedback = engine.processExecution(strugglingCode, '', '', false);
    if (helpFeedback) {
      console.log('🤖 AI Encouragement:');
      console.log(helpFeedback);
    }
  } else {
    console.log('❌ No teaching script found');
  }

  console.log('\n\n🎉 Demo Complete!');
  console.log('=' .repeat(50));
  console.log('🚀 Try it yourself with: lct ai-challenge two-sum');
  console.log('🆘 Get help anytime with: lct ai-help');
}

// Run demo if called directly
if (require.main === module) {
  demoAITeaching().catch(console.error);
}

module.exports = demoAITeaching;