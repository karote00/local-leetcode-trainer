const fs = require('fs');
const path = require('path');

// Initialize LeetCode practice environment
function main() {
  const projectRoot = process.cwd();
  const lctDir = path.join(projectRoot, '.lct');
  const configFile = path.join(lctDir, 'config.json');
  const guideFile = path.join(lctDir, 'LEARN_GUIDE.md');
  
  console.log('🎯 Initializing Local LeetCode Trainer...');
  console.log('');
  
  // Check if already initialized
  if (fs.existsSync(configFile)) {
    console.log('✅ Already initialized!');
    console.log(`📁 Config: ${path.relative(projectRoot, configFile)}`);
    console.log('');
    console.log('🚀 Ready to practice:');
    console.log('  lct c easy 1        # Generate easy problem');
    console.log('  lct test easy/two-sum  # Test your solution');
    console.log('  lct lang python     # Switch language');
    return;
  }
  
  try {
    // Create lct directory
    if (!fs.existsSync(lctDir)) {
      fs.mkdirSync(lctDir, { recursive: true });
      console.log('📁 Created .lct/ directory');
    }
    
    // Create default config
    const defaultConfig = {
      language: 'javascript',
      companies: [],
      createdAt: new Date().toISOString(),
      version: '1.0'
    };
    
    fs.writeFileSync(configFile, JSON.stringify(defaultConfig, null, 2));
    console.log('⚙️  Created .lct/config.json');
    
    // Create LEARN_GUIDE.md
    const guideContent = `# AI Learning Guide for LeetCode Problems

## 🎯 Your Role: Algorithm Mentor

When teaching LeetCode problems, you are an expert Algorithm Mentor. Your goal is to help develop deep algorithmic understanding, not just solve the specific problem.

## 📚 Teaching Methodology

### 1. **Start with Understanding**
- Ask what they already know about the problem
- Help them understand what the problem is really asking
- Walk through examples together
- Identify key constraints and edge cases

### 2. **Pattern Recognition**
- Help them identify the algorithmic patterns involved
- Explain why certain approaches work for this type of problem
- Connect to broader computer science concepts
- Show them how to recognize similar problems in the future

### 3. **Progressive Approach Development**
- Start with brute force - it's okay if it's inefficient
- Discuss time/space complexity trade-offs
- Guide them to optimized solutions through questioning
- Explain the reasoning behind each optimization

### 4. **Implementation Guidance**
- Help them think through the step-by-step algorithm
- Guide data structure selection with reasoning
- Point out common implementation pitfalls
- Encourage them to trace through examples

### 5. **Deeper Learning**
- Connect to related problems and patterns
- Discuss when to use different approaches
- Help them build intuition for complexity analysis
- Encourage pattern generalization

## 🗣️ Communication Style

- **Use Socratic questioning** - Guide discovery rather than giving direct answers
- **Be encouraging and patient** - Build confidence while challenging thinking
- **Focus on "why" not just "how"** - Help them understand the reasoning
- **Use analogies and examples** - Make abstract concepts concrete
- **Progressive disclosure** - Start simple, add complexity gradually

## 🎯 Remember

Your goal is not to solve this one problem for them, but to help them become better problem solvers. Every interaction should build their algorithmic intuition and pattern recognition skills.

Focus on teaching them to fish, not giving them a fish! 🎣`;

    fs.writeFileSync(guideFile, guideContent);
    console.log('📚 Created .lct/LEARN_GUIDE.md');
    console.log('');
    
    console.log('🎉 Initialization complete!');
    console.log('');
    console.log('📋 Project Structure:');
    console.log('  .lct/');
    console.log('  ├── config.json     # Your settings');
    console.log('  └── LEARN_GUIDE.md  # AI teaching methodology');
    console.log('  easy/               # Easy problems (created automatically)');
    console.log('  medium/             # Medium problems');
    console.log('  hard/               # Hard problems');
    console.log('');
    console.log('🚀 Get started:');
    console.log('  lct c easy 1        # Generate your first easy problem');
    console.log('  lct learn easy/two-sum  # Get AI learning prompts');
    console.log('  lct hint easy/two-sum   # Get progressive hints');
    console.log('  lct test easy/two-sum   # Test your solution');
    console.log('  lct lang python     # Switch to Python');
    console.log('  lct --help          # See all commands');
    console.log('');
    console.log('🤖 AI Learning:');
    console.log('  • Use "lct learn" to get AI teaching prompts');
    console.log('  • Copy prompts to ChatGPT, Claude, or any AI assistant');
    console.log('  • Or ask AI: "Please run \'yarn lct learn easy/two-sum\' to teach me"');
    console.log('');
    console.log('💡 Tip: Add .lct/ to your .gitignore if you want to keep settings local');
    
  } catch (error) {
    console.error('❌ Failed to initialize:', error.message);
    process.exit(1);
  }
}

main();