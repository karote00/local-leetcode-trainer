#!/usr/bin/env node

/**
 * Learning Assistant
 * Generates AI prompts and guidance for interactive learning sessions
 */

const fs = require('fs');
const path = require('path');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');
const { ALGORITHM_PATTERNS } = require('./hint.js');
const { getCondensedGuide } = require('./dynamic/condensed-guide.js');

// Function to get problem name from file path
function getProblemName(problemPath) {
  const parts = problemPath.split('/');
  if (parts.length >= 2) {
    return parts[parts.length - 2]; // Get folder name
  }
  return path.basename(problemPath, path.extname(problemPath));
}

// Function to resolve problem path
function resolveProblemPath(input) {
  const projectRoot = process.cwd();
  const language = getCurrentLanguage();
  const langConfig = getLanguageConfig(language);

  const parts = input.split('/');
  if (parts.length === 2) {
    const [difficulty, problemName] = parts;

    // Try active folder first
    const activePath = path.join(projectRoot, difficulty, problemName, `${problemName}${langConfig.extension}`);
    if (fs.existsSync(activePath)) {
      return path.relative(projectRoot, activePath);
    }

    // Try completed folder
    const completedPath = path.join(projectRoot, difficulty, 'completed', problemName, `${problemName}${langConfig.extension}`);
    if (fs.existsSync(completedPath)) {
      return path.relative(projectRoot, completedPath);
    }
  }

  return null;
}

// Function to read problem file content
function readProblemFile(problemPath) {
  try {
    const fullPath = path.resolve(problemPath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf8');
    }
  } catch (error) {
    console.warn(`Could not read problem file: ${error.message}`);
  }
  return null;
}

// Function to generate AI learning prompts
function generateAILearningPrompts(problemName, pattern, problemContent) {
  const prompts = {
    understanding: {
      title: "🔍 Problem Understanding Session",
      prompt: `I'm working on the "${pattern?.title || problemName}" problem. Here's the problem description:

${problemContent ? '```\n' + problemContent + '\n```' : 'Problem file not found - please help me understand this problem conceptually.'}

Can you help me understand:
1. What is this problem really asking me to do?
2. What are the key inputs and expected outputs?
3. What are the main constraints I need to consider?
4. Can you walk me through the examples to make sure I understand?

Please explain it in simple terms and help me identify the core challenge.`
    },

    patterns: {
      title: "🧩 Algorithm Pattern Recognition",
      prompt: `I'm analyzing the "${pattern?.title || problemName}" problem. ${pattern ? `I know it's categorized as a ${pattern.category} problem with patterns: ${pattern.patterns?.join(', ')}.` : ''}

Help me understand:
1. What algorithmic patterns or techniques apply to this type of problem?
2. How can I recognize similar problems in the future?
3. What are the key signals that suggest using ${pattern?.patterns?.[0] || 'specific algorithms'}?
4. What other problems use similar approaches?

Please help me develop pattern recognition skills, not just solve this specific problem.`
    },

    approaches: {
      title: "⚖️ Solution Approaches & Trade-offs",
      prompt: `For the "${pattern?.title || problemName}" problem, I want to explore different solution approaches.

${pattern?.approaches ? 
`I know there are approaches like: ${pattern.approaches.map(a => `${a.name} (${a.timeComplexity} time, ${a.spaceComplexity} space)`).join(', ')}.` : ''}

Can you help me:
1. What are the different ways to solve this problem?
2. What are the time and space complexity trade-offs for each approach?
3. When would I choose one approach over another?
4. Can you walk me through the thinking process for the most efficient solution?
5. What are the pros and cons of each approach?

I want to understand the reasoning behind algorithm selection, not just the implementation.`
    },

    implementation: {
      title: "💻 Implementation Guidance",
      prompt: `I'm ready to implement the "${pattern?.title || problemName}" problem. I understand the approach conceptually, but I need help with implementation details.

Can you guide me through:
1. What's the step-by-step algorithm I should follow?
2. What data structures should I use and why?
3. What are the key implementation details I need to be careful about?
4. Can you help me trace through an example step by step?
5. What are common implementation mistakes I should avoid?

Please guide me through the implementation process rather than just giving me the code. I want to learn to think through the implementation myself.`
    },

    debugging: {
      title: "🐛 Debugging & Testing Strategy",
      prompt: `I'm working on implementing the "${pattern?.title || problemName}" problem and want to make sure I test it thoroughly.

Help me with:
1. What edge cases should I test for this type of problem?
2. How can I trace through my algorithm to debug issues?
3. What are good test cases that would catch common mistakes?
4. How can I verify my solution is correct and efficient?
5. What debugging strategies work well for ${pattern?.category || 'this type of'} problems?

I want to develop good testing and debugging habits, not just get a working solution.`
    },

    optimization: {
      title: "🚀 Optimization & Complexity Analysis",
      prompt: `I have a working solution for the "${pattern?.title || problemName}" problem, but I want to understand optimization and complexity better.

${pattern?.approaches ? 
`I know the optimal approach is ${pattern.approaches[pattern.approaches.length - 1]?.name} with ${pattern.approaches[pattern.approaches.length - 1]?.timeComplexity} time complexity.` : ''}

Can you help me:
1. How do I analyze the time and space complexity of my solution?
2. Are there ways to optimize my current approach?
3. What's the theoretical optimal complexity for this problem and why?
4. How does my solution scale with larger inputs?
5. What optimization techniques are commonly used for ${pattern?.category || 'this type of'} problems?

I want to develop intuition for complexity analysis and optimization strategies.`
    },

    connections: {
      title: "🔗 Pattern Connections & Next Steps",
      prompt: `I've solved the "${pattern?.title || problemName}" problem and want to understand how it connects to other problems and concepts.

${pattern?.relatedProblems ? 
`I know related problems include: ${pattern.relatedProblems.join(', ')}.` : ''}

Help me understand:
1. What other problems use similar techniques or patterns?
2. How does this problem connect to broader algorithmic concepts?
3. What should I practice next to reinforce these patterns?
4. How can I generalize what I learned to solve new problems?
5. What are the key takeaways I should remember for future problems?

I want to build a connected understanding of algorithms, not just solve isolated problems.`
    }
  };

  return prompts;
}

// Function to show AI learning session
function showAILearningSession(problemPath) {
  const problemName = getProblemName(problemPath);
  const pattern = ALGORITHM_PATTERNS[problemName];
  const problemContent = readProblemFile(problemPath);

  console.log('🤖 AI Learning Session');
  console.log('═'.repeat(50));
  console.log(`📚 Problem: ${pattern?.title || problemName}`);
  if (pattern) {
    console.log(`🏷️  Category: ${pattern.category} (${pattern.difficulty})`);
    console.log(`🎯 Patterns: ${pattern.patterns?.join(', ')}`);
  }
  console.log('');
  
  console.log('🤖 **Copy this complete prompt to your AI assistant:**');
  console.log('');
  console.log('```');
  
  // Generate the complete prompt with embedded guide
  const condensedGuide = getCondensedGuide();
  const problemTitle = pattern?.title || problemName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  console.log(condensedGuide);
  console.log('');
  console.log(`## Problem: ${problemTitle} (${pattern?.category} - ${pattern?.difficulty})`);
  console.log('');
  if (problemContent) {
    console.log('Here\'s the problem description:');
    console.log('');
    console.log(problemContent);
    console.log('');
  }
  
  console.log('**I\'m working on this problem and would like your help as my Algorithm Mentor.**');
  console.log('');
  console.log('Please start by asking me:');
  console.log('- What do I understand about this problem so far?');
  console.log('- Where am I getting stuck or confused?');
  console.log('- Have I attempted any solutions yet?');
  console.log('');
  console.log('Based on my responses, guide me through understanding the problem, recognizing patterns, and developing an approach using the teaching methodology above.');
  console.log('```');
  console.log('');
  
  console.log('💡 **Alternative: Ask AI directly**');
  console.log(`You can also just ask: "Please run 'yarn lct learn ${problemName}' to teach me"`);
}

// Function to generate quick AI prompt
function generateQuickPrompt(problemPath, promptType = 'understanding') {
  const problemName = getProblemName(problemPath);
  const pattern = ALGORITHM_PATTERNS[problemName];
  const problemContent = readProblemFile(problemPath);

  const prompts = generateAILearningPrompts(problemName, pattern, problemContent);
  
  if (prompts[promptType]) {
    console.log(`🤖 **Copy this ${promptType} prompt to your AI assistant:**`);
    console.log('');
    console.log('```');
    
    // Add condensed guide to the specific prompt
    const condensedGuide = getCondensedGuide();
    console.log(condensedGuide);
    console.log('');
    console.log(prompts[promptType].prompt);
    console.log('```');
  } else {
    console.log(`❌ Unknown prompt type: ${promptType}`);
    console.log('Available types: understanding, patterns, approaches, implementation, debugging, optimization, connections');
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const problemInput = args[0];
  const promptType = args[1];

  if (!problemInput) {
    console.log('🤖 Learning Assistant');
    console.log('');
    console.log('💡 Usage:');
    console.log('  lct learn easy/two-sum                    # Full learning session');
    console.log('  lct learn easy/two-sum understanding      # Quick understanding prompt');
    console.log('  lct learn easy/two-sum patterns          # Quick pattern recognition prompt');
    console.log('  lct learn easy/two-sum approaches        # Quick approaches prompt');
    console.log('  lct learn easy/two-sum implementation    # Quick implementation prompt');
    console.log('  lct learn easy/two-sum debugging         # Quick debugging prompt');
    console.log('  lct learn easy/two-sum optimization      # Quick optimization prompt');
    console.log('  lct learn easy/two-sum connections       # Quick connections prompt');
    console.log('');
    console.log('🎯 This tool generates AI prompts for interactive learning with ChatGPT, Claude, etc.');
    console.log('');
    console.log('📚 Available for these problems:');
    Object.keys(ALGORITHM_PATTERNS).forEach(problem => {
      const pattern = ALGORITHM_PATTERNS[problem];
      console.log(`  ${problem.padEnd(20)} - ${pattern.category} (${pattern.difficulty})`);
    });
    return;
  }

  const problemPath = resolveProblemPath(problemInput);
  if (!problemPath) {
    console.log(`❌ Problem not found: ${problemInput}`);
    console.log('💡 Make sure you have generated the problem first with: lct challenge ${problemInput}');
    return;
  }

  if (promptType) {
    generateQuickPrompt(problemPath, promptType);
  } else {
    showAILearningSession(problemPath);
  }
}

// Export for use in other scripts
module.exports = {
  generateAILearningPrompts,
  showAILearningSession,
  generateQuickPrompt
};

// Run if called directly
if (require.main === module) {
  main();
}