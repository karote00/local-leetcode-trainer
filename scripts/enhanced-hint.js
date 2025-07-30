const fs = require('fs');
const path = require('path');
const AITeachingEngine = require('./dynamic/ai-teaching-engine');

/**
 * Enhanced Hint System with AI Teaching Integration
 */
class EnhancedHintSystem {
  constructor() {
    this.aiEngine = new AITeachingEngine();
    this.fallbackHints = require('./hint.js'); // Use existing hint system as fallback
  }

  /**
   * Get intelligent hints for a problem
   */
  async getHint(problemName, level = 1, query = '') {
    try {
      // Try to load AI teaching script first
      const problemPath = this.findProblemPath(problemName);
      if (problemPath) {
        const script = this.aiEngine.loadScript(problemPath);
        if (script) {
          return this.getAIHint(problemName, level, query);
        }
      }

      // Fall back to traditional hint system
      return this.getFallbackHint(problemName, level);
    } catch (error) {
      console.error('Error getting hint:', error.message);
      return this.getFallbackHint(problemName, level);
    }
  }

  /**
   * Get AI-powered contextual hint
   */
  getAIHint(problemName, level, query) {
    console.log(`🤖 **AI-Enhanced Hints for ${this.aiEngine.currentScript?.title || problemName}**\n`);
    
    // Show introduction if level 1
    if (level === 1) {
      const intro = this.aiEngine.getIntroduction();
      if (intro) {
        console.log('🎯 **Problem Overview:**');
        console.log(intro);
        console.log('');
      }

      const prePrompt = this.aiEngine.getPrePrompt();
      if (prePrompt) {
        console.log('💭 **Strategic Guidance:**');
        console.log(prePrompt);
        console.log('');
      }
    }

    // Handle specific queries
    if (query) {
      console.log(`🔍 **Responding to: "${query}"**\n`);
      const response = this.aiEngine.handleRequest(query);
      if (response) {
        console.log('🤖 **AI Response:**');
        console.log(response);
        return;
      }
    }

    // Provide level-based hints
    console.log(`💡 **Hint Level ${level}:**\n`);
    
    // Simulate different code patterns based on level to trigger appropriate hints
    const simulatedCode = this.getSimulatedCodeForLevel(level);
    const hint = this.aiEngine.getHint(simulatedCode);
    
    if (hint) {
      console.log(hint);
    } else {
      console.log('🤔 Try working on the problem and the AI will provide contextual hints based on your approach!');
    }

    // Show progression
    if (level < 3) {
      console.log(`\n💫 **Next:** Try \`lct hint ${problemName} ${level + 1}\` for more specific guidance`);
    }
  }

  /**
   * Generate simulated code patterns to trigger appropriate AI hints
   */
  getSimulatedCodeForLevel(level) {
    switch (level) {
      case 1:
        return 'function solve() { for (let i = 0; i < arr.length; i++) { } }'; // Basic loop
      case 2:
        return 'function solve() { for (let i = 0; i < arr.length; i++) { for (let j = i + 1; j < arr.length; j++) { } } }'; // Nested loops
      case 3:
        return 'function solve() { const map = new Map(); for (let i = 0; i < arr.length; i++) { } }'; // Using data structures
      default:
        return 'function solve() { }';
    }
  }

  /**
   * Find problem path in the file system
   */
  findProblemPath(problemName) {
    const difficulties = ['easy', 'medium', 'hard'];
    const basePath = path.join(__dirname, 'dynamic', 'problems');

    for (const difficulty of difficulties) {
      const problemPath = path.join(basePath, difficulty, problemName);
      if (fs.existsSync(problemPath)) {
        return problemPath;
      }
    }

    return null;
  }

  /**
   * Fall back to traditional hint system
   */
  getFallbackHint(problemName, level) {
    console.log(`💡 **Traditional Hints for ${problemName}** (Level ${level})\n`);
    console.log('🔄 No AI teaching script available - using traditional hint system\n');
    
    // This would integrate with the existing hint.js system
    console.log('💭 Consider the problem constraints and think about:');
    console.log('• What data structure would be most efficient?');
    console.log('• Can you optimize the time complexity?');
    console.log('• Are there any edge cases to handle?');
    console.log('');
    console.log('🎯 **Tip:** Create a teaching script for this problem to get AI-powered hints!');
    console.log(`   Run: \`node scripts/generate-teaching-script.js path/to/${problemName}\``);
  }

  /**
   * Show learning analysis for a problem
   */
  async showLearning(problemName) {
    const problemPath = this.findProblemPath(problemName);
    if (problemPath) {
      const script = this.aiEngine.loadScript(problemPath);
      if (script) {
        console.log(`🎓 **Learning Analysis: ${script.title}**\n`);
        
        const intro = this.aiEngine.getIntroduction();
        if (intro) {
          console.log('📖 **Concept Overview:**');
          console.log(intro);
          console.log('');
        }

        const prePrompt = this.aiEngine.getPrePrompt();
        if (prePrompt) {
          console.log('🧠 **Strategic Thinking:**');
          console.log(prePrompt);
          console.log('');
        }

        // Show success message which often contains complexity analysis
        const successMsg = this.aiEngine.getSuccessMessage();
        if (successMsg) {
          console.log('📊 **Mastery Insights:**');
          console.log(successMsg);
        }

        return;
      }
    }

    // Fall back to traditional learning
    console.log(`🎓 **Learning Mode: ${problemName}**\n`);
    console.log('📚 No AI teaching script available for detailed analysis.\n');
    console.log('🎯 **General Learning Tips:**');
    console.log('• Understand the problem constraints thoroughly');
    console.log('• Consider multiple solution approaches');
    console.log('• Analyze time and space complexity');
    console.log('• Think about edge cases and error handling');
    console.log('• Practice explaining your solution out loud');
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const problemName = args[1];
  const level = parseInt(args[2]) || 1;

  const hintSystem = new EnhancedHintSystem();

  switch (command) {
    case 'hint':
      if (!problemName) {
        console.log('Usage: node enhanced-hint.js hint <problem-name> [level]');
        console.log('Example: node enhanced-hint.js hint two-sum 1');
        return;
      }
      await hintSystem.getHint(problemName, level);
      break;

    case 'learn':
      if (!problemName) {
        console.log('Usage: node enhanced-hint.js learn <problem-name>');
        console.log('Example: node enhanced-hint.js learn two-sum');
        return;
      }
      await hintSystem.showLearning(problemName);
      break;

    case 'help':
      const query = args.slice(1).join(' ');
      if (!query) {
        console.log('🤖 **AI Help System**\n');
        console.log('Ask me anything about algorithms, data structures, or problem-solving!\n');
        console.log('Examples:');
        console.log('• "I don\'t understand hash maps"');
        console.log('• "When should I use a stack?"');
        console.log('• "How do I optimize this nested loop?"');
        console.log('• "What\'s the difference between BFS and DFS?"');
        return;
      }
      
      console.log(`🤖 **AI Assistant Response to: "${query}"**\n`);
      console.log('💭 Based on your question, here\'s some guidance:\n');
      
      // Simple keyword-based responses (could be enhanced with NLP)
      if (query.toLowerCase().includes('hash') || query.toLowerCase().includes('map')) {
        console.log('🗺️ **Hash Maps/Hash Tables:**');
        console.log('• Perfect for O(1) lookups when you need "have I seen this before?"');
        console.log('• Great for problems involving pairs, complements, or frequency counting');
        console.log('• Trade space for time - use extra memory to make lookups faster');
        console.log('• Common patterns: Two Sum, Group Anagrams, First Unique Character');
      } else if (query.toLowerCase().includes('stack')) {
        console.log('📚 **Stack Data Structure:**');
        console.log('• LIFO (Last In, First Out) - like a stack of plates');
        console.log('• Perfect for problems involving matching pairs, nested structures');
        console.log('• Great for "most recent" relationships and undo operations');
        console.log('• Common patterns: Valid Parentheses, Daily Temperatures, Largest Rectangle');
      } else if (query.toLowerCase().includes('optimize') || query.toLowerCase().includes('nested loop')) {
        console.log('⚡ **Optimization Strategies:**');
        console.log('• Hash maps can often reduce O(n²) to O(n) for lookup-heavy problems');
        console.log('• Two pointers technique for sorted arrays');
        console.log('• Consider if you\'re doing redundant work that can be cached');
        console.log('• Sometimes trading space for time complexity is worth it');
      } else {
        console.log('🤔 I\'d be happy to help! Try asking about specific topics like:');
        console.log('• Data structures (arrays, hash maps, stacks, queues, trees)');
        console.log('• Algorithms (sorting, searching, dynamic programming)');
        console.log('• Optimization techniques (time/space complexity)');
        console.log('• Problem-solving patterns (two pointers, sliding window, etc.)');
      }
      break;

    default:
      console.log('Available commands:');
      console.log('  hint <problem-name> [level] - Get intelligent hints');
      console.log('  learn <problem-name> - Deep learning analysis');
      console.log('  help <query> - Ask AI assistant anything');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = EnhancedHintSystem;