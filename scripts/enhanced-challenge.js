#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const AITeachingEngine = require('./dynamic/ai-teaching-engine');
const ProblemManager = require('./dynamic/problem-manager');

/**
 * Enhanced Challenge Command with AI Teaching Integration
 */
class AIChallenge {
  constructor() {
    this.teachingEngine = new AITeachingEngine();
    this.problemManager = new ProblemManager();
    this.currentProblem = null;
    this.workingDirectory = null;
  }

  /**
   * Start an AI-guided challenge
   */
  async startChallenge(problemIdentifier) {
    try {
      // Load the problem
      this.currentProblem = await this.problemManager.getProblem(problemIdentifier);
      if (!this.currentProblem) {
        console.log('❌ Problem not found. Try: lct ai-challenge two-sum');
        return;
      }

      // Set up working directory
      this.workingDirectory = path.join(process.cwd(), 'leetcode-practice', this.currentProblem.name);
      this.ensureWorkingDirectory();

      // Load teaching script
      const problemPath = this.getProblemPath();
      const script = this.teachingEngine.loadScript(problemPath);

      console.log('🤖 AI Teaching Mode Activated!\\n');
      
      if (script) {
        console.log('📚 Teaching script loaded for enhanced guidance\\n');
        this.showIntroduction();
      } else {
        console.log('📝 No teaching script available - using standard mode\\n');
      }

      // Show problem details
      this.displayProblem();
      
      if (script) {
        this.showPrePrompt();
      }

      // Set up the coding environment
      this.setupCodingEnvironment();
      
      console.log('\\n🚀 Ready to code! Your solution file is ready.');
      console.log('💡 Run your code with: node solution.js');
      console.log('🆘 Need help? Type: lct ai-help');
      
    } catch (error) {
      console.error('❌ Error starting AI challenge:', error.message);
    }
  }

  /**
   * Show AI introduction
   */
  showIntroduction() {
    const intro = this.teachingEngine.getIntroduction();
    if (intro) {
      console.log('🎯 ' + '='.repeat(60));
      console.log(intro);
      console.log('='.repeat(64) + '\\n');
    }
  }

  /**
   * Show pre-coding guidance
   */
  showPrePrompt() {
    const prePrompt = this.teachingEngine.getPrePrompt();
    if (prePrompt) {
      console.log('💭 ' + '='.repeat(60));
      console.log(prePrompt);
      console.log('='.repeat(64) + '\\n');
    }
  }

  /**
   * Display problem information
   */
  displayProblem() {
    console.log(`📋 **${this.currentProblem.title}** (${this.currentProblem.difficulty})`);
    console.log(`🏷️  Topics: ${this.currentProblem.topics?.join(', ') || 'N/A'}`);
    console.log('\\n📖 **Description:**');
    console.log(this.currentProblem.description);
    
    if (this.currentProblem.examples?.length > 0) {
      console.log('\\n💡 **Examples:**');
      this.currentProblem.examples.forEach((example, i) => {
        console.log(`\\n**Example ${i + 1}:**`);
        console.log(`Input: ${example.input}`);
        console.log(`Output: ${example.output}`);
        if (example.explanation) {
          console.log(`Explanation: ${example.explanation}`);
        }
      });
    }

    if (this.currentProblem.constraints?.length > 0) {
      console.log('\\n⚠️  **Constraints:**');
      this.currentProblem.constraints.forEach(constraint => {
        console.log(`• ${constraint}`);
      });
    }
  }

  /**
   * Set up coding environment with solution template
   */
  setupCodingEnvironment() {
    const solutionPath = path.join(this.workingDirectory, 'solution.js');
    const testPath = path.join(this.workingDirectory, 'test.js');

    // Create solution template
    const solutionTemplate = this.generateSolutionTemplate();
    fs.writeFileSync(solutionPath, solutionTemplate);

    // Create test file
    const testTemplate = this.generateTestTemplate();
    fs.writeFileSync(testPath, testTemplate);

    // Create AI helper script
    const helperPath = path.join(this.workingDirectory, 'ai-helper.js');
    const helperTemplate = this.generateHelperTemplate();
    fs.writeFileSync(helperPath, helperTemplate);
  }

  /**
   * Generate solution template
   */
  generateSolutionTemplate() {
    const signature = this.currentProblem.functionSignatures?.javascript;
    if (!signature) {
      return `// ${this.currentProblem.title}\\n// TODO: Implement your solution here\\n\\nfunction solution() {\\n    // Your code here\\n}\\n\\nmodule.exports = solution;`;
    }

    const params = signature.params.map(p => p.name).join(', ');
    const paramTypes = signature.params.map(p => `${p.name}: ${p.type}`).join(', ');
    
    return `/**
 * ${this.currentProblem.title}
 * @param {${paramTypes}}
 * @return {${signature.returnType}}
 */
function ${signature.name}(${params}) {
    // TODO: Implement your solution here
    
}

// Test your solution
const testCases = ${JSON.stringify(this.currentProblem.testCases || [], null, 2)};

testCases.forEach((testCase, index) => {
    const result = ${signature.name}(...testCase.input);
    const expected = testCase.expected;
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    
    console.log(\`Test \${index + 1}: \${passed ? '✅ PASS' : '❌ FAIL'}\`);
    if (!passed) {
        console.log(\`  Expected: \${JSON.stringify(expected)}\`);
        console.log(\`  Got: \${JSON.stringify(result)}\`);
    }
});

module.exports = ${signature.name};`;
  }

  /**
   * Generate test template
   */
  generateTestTemplate() {
    return `const solution = require('./solution');
const AITeachingEngine = require('../../../scripts/dynamic/ai-teaching-engine');

// Initialize AI teaching engine
const ai = new AITeachingEngine();
ai.loadScript('${this.getProblemPath()}');

// Run tests with AI feedback
console.log('🧪 Running tests with AI guidance...\\n');

// This would integrate with the actual test runner
// For now, it's a placeholder for the enhanced testing experience
console.log('💡 Tip: The AI will analyze your code and provide feedback based on results!');`;
  }

  /**
   * Generate AI helper template
   */
  generateHelperTemplate() {
    return `const AITeachingEngine = require('../../../scripts/dynamic/ai-teaching-engine');
const fs = require('fs');

// AI Helper for getting contextual hints
const ai = new AITeachingEngine();
ai.loadScript('${this.getProblemPath()}');

// Read current solution
const solutionPath = './solution.js';
const code = fs.readFileSync(solutionPath, 'utf8');

// Get contextual hint
const hint = ai.getHint(code);
if (hint) {
    console.log('💡 AI Hint:');
    console.log(hint);
} else {
    console.log('🤖 No specific hints available. Keep coding!');
}

// Show script info
const info = ai.getScriptInfo();
if (info) {
    console.log(\`\\n📊 Problem: \${info.title} (\${info.difficulty})\`);
    console.log(\`🏷️  Tags: \${info.tags.join(', ')}\`);
}`;
  }

  /**
   * Get problem path for teaching script
   */
  getProblemPath() {
    return path.join(__dirname, 'dynamic', 'problems', this.currentProblem.difficulty, this.currentProblem.name);
  }

  /**
   * Ensure working directory exists
   */
  ensureWorkingDirectory() {
    if (!fs.existsSync(this.workingDirectory)) {
      fs.mkdirSync(this.workingDirectory, { recursive: true });
    }
  }

  /**
   * Handle AI help requests
   */
  async handleHelpRequest(query = '') {
    if (!this.teachingEngine.currentScript) {
      console.log('🤖 AI teaching not available for this problem.');
      return;
    }

    // Try to get contextual help based on query
    const response = this.teachingEngine.handleRequest(query);
    if (response) {
      console.log('🤖 AI Assistant:');
      console.log(response);
    } else {
      // Provide general help
      console.log('🤖 AI Assistant: I\'m here to help! Try being more specific about what you\'re stuck on.');
    }
  }

  /**
   * Process code execution results
   */
  processExecution(code, stdout, stderr, passed) {
    const feedback = this.teachingEngine.processExecution(code, stdout, stderr, passed);
    if (feedback) {
      console.log('\\n🤖 AI Feedback:');
      console.log(feedback);
    }

    if (passed) {
      const successMessage = this.teachingEngine.getSuccessMessage();
      if (successMessage) {
        console.log('\\n🎉 Success Message:');
        console.log(successMessage);
      }
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const aiChallenge = new AIChallenge();

  switch (command) {
    case 'start':
      const problemId = args[1];
      if (!problemId) {
        console.log('Usage: node ai-challenge.js start <problem-name>');
        console.log('Example: node ai-challenge.js start two-sum');
        process.exit(1);
      }
      aiChallenge.startChallenge(problemId);
      break;
      
    case 'help':
      const query = args.slice(1).join(' ');
      aiChallenge.handleHelpRequest(query);
      break;
      
    default:
      console.log('Available commands:');
      console.log('  start <problem-name> - Start AI-guided challenge');
      console.log('  help [query] - Get AI assistance');
  }
}

module.exports = AIChallenge;