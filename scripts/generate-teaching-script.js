#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Template generator for AI teaching scripts
 */
class TeachingScriptGenerator {
  constructor() {
    this.templates = {
      basic: this.getBasicTemplate(),
      comprehensive: this.getComprehensiveTemplate(),
      advanced: this.getAdvancedTemplate()
    };
  }

  /**
   * Generate a teaching script for a problem
   */
  generateScript(problemPath, templateType = 'basic', options = {}) {
    try {
      // Load problem metadata
      const problemFile = this.findProblemFile(problemPath);
      if (!problemFile) {
        throw new Error(`Problem file not found in ${problemPath}`);
      }

      const problemData = require(problemFile);
      const template = this.templates[templateType];
      
      if (!template) {
        throw new Error(`Template type '${templateType}' not found`);
      }

      // Generate script content
      const script = this.populateTemplate(template, problemData, options);
      
      // Write to trainer.yaml
      const scriptPath = path.join(problemPath, 'trainer.yaml');
      const yamlContent = yaml.dump(script, { 
        lineWidth: 100,
        noRefs: true,
        quotingType: '"'
      });
      
      fs.writeFileSync(scriptPath, yamlContent);
      console.log(`✅ Teaching script generated: ${scriptPath}`);
      
      return scriptPath;
    } catch (error) {
      console.error(`❌ Error generating script: ${error.message}`);
      return null;
    }
  }

  /**
   * Find problem file in directory
   */
  findProblemFile(problemPath) {
    const files = fs.readdirSync(problemPath);
    const jsFile = files.find(f => f.endsWith('.js') && f !== 'trainer.js');
    return jsFile ? path.join(problemPath, jsFile) : null;
  }

  /**
   * Populate template with problem data
   */
  populateTemplate(template, problemData, options) {
    const script = JSON.parse(JSON.stringify(template)); // Deep clone
    
    // Fill in basic metadata
    script.id = problemData.name || problemData.id;
    script.title = problemData.title;
    script.difficulty = problemData.difficulty;
    script.tags = problemData.topics || [];
    script.language = options.language || 'javascript';

    // Customize content based on problem characteristics
    this.customizeForProblem(script, problemData, options);
    
    return script;
  }

  /**
   * Customize script based on problem characteristics
   */
  customizeForProblem(script, problemData, options) {
    const topics = problemData.topics || [];
    const difficulty = problemData.difficulty;

    // Add topic-specific hints
    if (topics.includes('Dynamic Programming')) {
      this.addDPHints(script);
    }
    if (topics.includes('Binary Tree')) {
      this.addTreeHints(script);
    }
    if (topics.includes('Hash Table')) {
      this.addHashTableHints(script);
    }
    if (topics.includes('Two Pointers')) {
      this.addTwoPointerHints(script);
    }

    // Adjust complexity based on difficulty
    if (difficulty === 'hard') {
      this.addAdvancedGuidance(script);
    }
  }

  /**
   * Add Dynamic Programming specific hints
   */
  addDPHints(script) {
    script.steps.push({
      type: 'hint',
      trigger: 'code.includes("for") && !code.includes("dp")',
      content: `💡 **Dynamic Programming Hint**
      
This looks like a DP problem! Consider:
1. **State definition**: What does dp[i] represent?
2. **Recurrence relation**: How does dp[i] relate to previous states?
3. **Base cases**: What are the initial values?
4. **Bottom-up vs Top-down**: Which approach fits better?

Try defining your DP array first!`
    });
  }

  /**
   * Add Binary Tree specific hints
   */
  addTreeHints(script) {
    script.steps.push({
      type: 'hint',
      trigger: 'code.includes("TreeNode") && !code.includes("recursive")',
      content: `🌳 **Tree Traversal Hint**
      
Tree problems often use recursion! Consider:
- **Base case**: What happens with null nodes?
- **Recursive case**: How do you process left and right subtrees?
- **Return value**: What should each recursive call return?

Common patterns: DFS (preorder, inorder, postorder) or BFS (level-order)`
    });
  }

  /**
   * Add Hash Table specific hints
   */
  addHashTableHints(script) {
    script.steps.push({
      type: 'hint',
      trigger: 'code.includes("for") && !code.includes("Map") && !code.includes("Set")',
      content: `🗺️ **Hash Table Optimization**
      
This problem might benefit from a hash table!
- **Map**: Store key-value pairs for O(1) lookup
- **Set**: Store unique values for O(1) membership testing
- **Pattern**: Often used to trade space for time complexity

Consider what you need to "remember" as you iterate!`
    });
  }

  /**
   * Add Two Pointers specific hints
   */
  addTwoPointerHints(script) {
    script.steps.push({
      type: 'hint',
      trigger: 'code.includes("for") && !code.includes("left") && !code.includes("right")',
      content: `👆 **Two Pointers Technique**
      
Try the two pointers approach:
- **Initialize**: left = 0, right = array.length - 1
- **Move pointers**: Based on comparison of values
- **Convergence**: Continue until pointers meet

This often reduces O(n²) to O(n) complexity!`
    });
  }

  /**
   * Add advanced guidance for hard problems
   */
  addAdvancedGuidance(script) {
    script.steps.push({
      type: 'on_run',
      trigger: 'passed === false && attempts > 5',
      content: `🎯 **Hard Problem Strategy**
      
This is a challenging problem! Break it down:
1. **Understand the problem**: Read examples carefully
2. **Identify patterns**: What algorithmic technique applies?
3. **Start simple**: Implement brute force first
4. **Optimize**: Look for redundant computations
5. **Edge cases**: Handle boundary conditions

Don't give up! Hard problems teach the most valuable lessons. 💪`
    });
  }

  /**
   * Basic template for simple problems
   */
  getBasicTemplate() {
    return {
      id: '',
      title: '',
      difficulty: '',
      tags: [],
      language: 'javascript',
      steps: [
        {
          type: 'intro',
          content: `🎯 **{{title}}**
          
This is a {{difficulty}} level problem that will help you practice fundamental programming concepts.
Take your time to understand the problem before coding!`
        },
        {
          type: 'pre_prompt',
          content: `🚀 **Getting Started**
          
Think about the approach:
1. What's the simplest solution you can think of?
2. Are there any edge cases to consider?
3. Can you optimize the time or space complexity?`
        },
        {
          type: 'on_run',
          trigger: 'stderr.match(/Error|undefined/)',
          content: `🐛 **Debugging Help**
          
Looks like there's an error in your code!
- Check for typos and syntax errors
- Verify array bounds and null checks
- Make sure all variables are properly declared`
        },
        {
          type: 'on_run',
          trigger: 'passed === true',
          content: `🎉 **Great job!**
          
You solved the problem! Consider:
- Is there a more efficient solution?
- What's the time and space complexity?
- What did you learn from this problem?`
        }
      ]
    };
  }

  /**
   * Comprehensive template with more guidance
   */
  getComprehensiveTemplate() {
    return {
      id: '',
      title: '',
      difficulty: '',
      tags: [],
      language: 'javascript',
      steps: [
        {
          type: 'intro',
          content: `🎯 **{{title}}**
          
This {{difficulty}} problem covers important algorithmic concepts.
Focus on understanding the problem constraints and examples before implementing.`
        },
        {
          type: 'pre_prompt',
          content: `🚀 **Strategy Planning**
          
Consider multiple approaches:
1. **Brute force**: What's the straightforward solution?
2. **Optimization**: Can you reduce time/space complexity?
3. **Edge cases**: What special cases need handling?
4. **Data structures**: Which ones might be helpful?`
        },
        {
          type: 'hint',
          trigger: 'attempts > 2 && passed === false',
          content: `💡 **Need a hint?**
          
You've been working on this for a while. Here's some guidance:
- Review the problem examples carefully
- Consider if you're handling all edge cases
- Think about the most efficient data structure for this problem`
        },
        {
          type: 'on_run',
          trigger: 'stderr.match(/TypeError|ReferenceError/)',
          content: `🐛 **Runtime Error Help**
          
Common issues to check:
- Accessing undefined variables or properties
- Array index out of bounds
- Null pointer exceptions
- Incorrect function calls`
        },
        {
          type: 'on_run',
          trigger: 'passed === false && attempts > 1',
          content: `🤔 **Still working on it?**
          
That's okay! Debugging is part of learning:
- Add console.log statements to trace execution
- Test with the provided examples manually
- Check your logic step by step`
        },
        {
          type: 'on_run',
          trigger: 'passed === true',
          content: `🎉 **Excellent work!**
          
You solved it! Reflect on:
- What approach did you use?
- What was the time/space complexity?
- Could it be optimized further?
- What similar problems could you solve now?`
        },
        {
          type: 'after_success',
          content: `🏆 **Problem Complete!**
          
**Next steps:**
- Try explaining your solution out loud
- Consider alternative approaches
- Look for similar problems to practice
- Review the time/space complexity analysis`
        }
      ]
    };
  }

  /**
   * Advanced template for complex problems
   */
  getAdvancedTemplate() {
    return {
      id: '',
      title: '',
      difficulty: '',
      tags: [],
      language: 'javascript',
      steps: [
        {
          type: 'intro',
          content: `🎯 **{{title}} - Advanced Challenge**
          
This is a sophisticated problem that requires deep algorithmic thinking.
Take time to understand the problem thoroughly and consider multiple solution approaches.`
        },
        {
          type: 'pre_prompt',
          content: `🚀 **Advanced Strategy**
          
Approach this systematically:
1. **Problem analysis**: What's the core challenge?
2. **Algorithm selection**: Which technique fits best?
3. **Complexity analysis**: What are the time/space trade-offs?
4. **Implementation strategy**: How to code it cleanly?`
        },
        {
          type: 'hint',
          trigger: 'code.length < 50',
          content: `🤔 **Getting Started?**
          
Complex problems need careful planning:
- Break the problem into smaller subproblems
- Consider what data structures you'll need
- Think about the algorithm before coding
- Start with a working solution, then optimize`
        },
        {
          type: 'hint',
          trigger: 'attempts > 3 && passed === false',
          content: `💡 **Advanced Hint**
          
You're tackling a challenging problem! Consider:
- Are you using the most appropriate algorithm?
- Have you considered all edge cases?
- Is there a mathematical insight you're missing?
- Would a different data structure help?`
        },
        {
          type: 'on_run',
          trigger: 'passed === false && attempts > 5',
          content: `🎯 **Persistence Pays Off**
          
Hard problems require patience! Try:
- Stepping back and re-reading the problem
- Looking at the examples more carefully
- Considering a completely different approach
- Breaking the problem into smaller pieces`
        },
        {
          type: 'on_run',
          trigger: 'passed === true',
          content: `🎉 **Outstanding Achievement!**
          
You conquered a challenging problem! This demonstrates:
- Advanced problem-solving skills
- Algorithmic thinking
- Persistence and debugging ability
- Deep understanding of data structures`
        },
        {
          type: 'after_success',
          content: `🏆 **Mastery Achieved!**
          
**Advanced Analysis:**
- What was the key insight that led to the solution?
- How does this problem relate to other advanced algorithms?
- What variations of this problem exist?
- How would you explain this solution in an interview?`
        }
      ]
    };
  }

  /**
   * List available templates
   */
  listTemplates() {
    console.log('📝 Available Teaching Script Templates:');
    console.log('');
    console.log('1. **basic** - Simple guidance for straightforward problems');
    console.log('2. **comprehensive** - Detailed guidance with multiple hints');
    console.log('3. **advanced** - Sophisticated guidance for complex problems');
    console.log('');
    console.log('Usage: node generate-teaching-script.js <problem-path> [template-type]');
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const generator = new TeachingScriptGenerator();

  if (args.length === 0) {
    generator.listTemplates();
    process.exit(0);
  }

  const problemPath = args[0];
  const templateType = args[1] || 'basic';
  const options = {
    language: args[2] || 'javascript'
  };

  if (!fs.existsSync(problemPath)) {
    console.error(`❌ Problem path does not exist: ${problemPath}`);
    process.exit(1);
  }

  generator.generateScript(problemPath, templateType, options);
}

module.exports = TeachingScriptGenerator;