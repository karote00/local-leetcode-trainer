# 🎯 Local LeetCode Trainer

A complete local LeetCode practice environment - use your IDE, your tools, your way. Practice with full debugging support, AI collaboration, and instant testing, then submit to LeetCode when ready.

## ✨ Why Practice Locally?

**Use Your Development Environment, Not a Web Browser**

Unlike the LeetCode website where you're limited to a basic web editor, the Local LeetCode Trainer gives you a complete development environment where you can:

- 🤖 **Collaborate with AI** - Use ChatGPT, Claude, Copilot freely in your IDE
- 🔍 **Debug freely** - Add console.logs, breakpoints, step through your code
- ⚡ **Instant testing** - No network delays, test immediately on your machine
- 🛠️ **Use your IDE** - VS Code, IntelliJ, or whatever you prefer
- 📝 **Custom test cases** - Add your own edge cases and scenarios
- 🎯 **Focus on learning** - Built-in hints and algorithmic thinking guidance

## 🆚 LeetCode Website vs Local Trainer

| Feature | LeetCode Website | Local LeetCode Trainer |
|---------|------------------|---------------|
| **Development Environment** | 🌐 Web editor only | 🛠️ Your IDE + tools |
| **AI Collaboration** | ❌ Limited | ✅ Full access |
| **Custom Test Cases** | ❌ No | ✅ Yes |
| **Debugging Tools** | ❌ Limited | ✅ Full IDE support |
| **Code Iteration Speed** | 🐌 Network delays | ⚡ Instant |
| **Progress Tracking** | ✅ Yes | ✅ Yes + Local |
| **Company Insights** | ✅ Yes | ✅ Yes |
| **Official Validation** | ✅ Yes | ❌ No |
| **Discussion Forums** | ✅ Yes | ❌ No |

## 🚀 Quick Start

### Option 1: NPM Installation (Recommended)
```bash
# Install globally
npm install -g local-leetcode-trainer

# Start practicing immediately
leetcode-trainer challenge easy
# or use the short alias
lct challenge easy
```

### Option 2: Clone Repository
```bash
# Clone and setup
git clone https://github.com/karote00/local-leetcode-trainer
cd local-leetcode-trainer
yarn install

# Use yarn commands
yarn challenge easy
```

### Getting Started
```bash
# Choose your language (JavaScript is default)
leetcode-trainer lang python    # Switch to Python
lct lang java                   # Switch to Java
lct lang                        # Show current language

# Get your first challenge
lct challenge easy

# Start coding and testing
lct test easy/two-sum
lct open easy/two-sum           # Opens LeetCode for final submission

# Mark as completed when done
lct complete easy/two-sum
```

## 🎯 Perfect Workflow

### 1. **Local Development & Learning**
```bash
yarn challenge medium           # Get a random problem
yarn test medium/problem-name   # Test your solution locally
# Ask AI: "Can you explain this algorithm approach?"
# Add console.logs, debug, iterate quickly
```

### 2. **AI-Powered Learning**
- **Explain algorithms**: "How does this hash map approach work?"
- **Code review**: "Can you optimize this solution?"
- **Debug help**: "Why is my solution failing this test case?"
- **Pattern recognition**: "What other problems use this technique?"

### 3. **Final Validation**
```bash
yarn open medium/problem-name   # Open LeetCode
# Copy your working solution and submit
yarn complete medium/problem-name  # Track your progress
```

## 📁 Smart Organization

```
├── easy/
│   ├── two-sum/                # Active problems
│   ├── palindrome-number/
│   └── completed/              # Finished problems
│       ├── valid-parentheses/
│       └── merge-two-lists/
├── medium/
│   ├── add-two-numbers/
│   └── completed/
├── hard/
│   └── completed/
└── scripts/                    # All the magic happens here
```

## 🛠️ Available Commands

### Core Practice
```bash
yarn challenge easy             # Get 1 easy problem
yarn challenge medium 2         # Get 2 medium problems
yarn test easy/two-sum          # Test your solution
yarn open easy/two-sum          # Open LeetCode link
```

### Language Management
```bash
yarn lang                       # Show current language & stats
yarn lang python              # Switch to Python (archives current work)
yarn lang javascript          # Switch to JavaScript
yarn lang java                # Switch to Java
yarn lang cpp                 # Switch to C++
```

### AI-Powered Learning Assistant
```bash
lct hint easy/two-sum          # Get progressive hints
lct hint easy/two-sum 2        # Get more advanced hints
lct learn easy/two-sum         # Show algorithm approaches & complexity
lct patterns                   # List all available algorithm patterns
```

### Progress Tracking
```bash
yarn complete easy/two-sum      # Mark as completed
yarn complete list              # See all completed problems
yarn complete undo easy/two-sum # Move back to active
```

### Smart Features
- **Auto-detection**: Commands work whether problem is active or completed
- **Progress tracking**: See completion stats per difficulty
- **Company insights**: Know which companies ask each question
- **Random challenges**: Never run out of problems to solve

## 🎨 Features

### 🌍 Multi-Language Support
- **JavaScript** - Default, Node.js execution
- **Python** - Python 3 execution  
- **Java** - Compile and run with JDK
- **C++** - Compile with g++ and execute
- **Clean switching** - Archives current work when changing languages
- **Language-specific templates** - Proper syntax and structure for each language

### 🤖 AI-Friendly Environment
- **Full IDE integration** - Use your favorite editor with AI assistants
- **Debugging support** - Add breakpoints, console.logs, step through code
- **Code iteration** - Modify and test instantly without network delays
- **Learning conversations** - Ask AI to explain concepts, algorithms, optimizations

### 🧠 Built-in Learning Assistant
- **Progressive hints** - Get hints without spoiling the solution
- **Algorithm approaches** - Learn multiple ways to solve each problem
- **Complexity analysis** - Understand time and space trade-offs
- **Pattern recognition** - See connections between similar problems
- **Related problems** - Discover what to practice next

### ⚡ Lightning Fast
- **Instant testing** - No network delays, immediate feedback
- **Local execution** - Everything runs on your machine
- **Quick iteration** - Modify code and test in seconds

### 📊 Smart Progress Tracking
- **Completion tracking** - Organized by difficulty level
- **Progress stats** - See how many problems you've solved
- **Review capability** - Test completed problems anytime
- **Smart organization** - Clean separation of active vs completed

### 🏢 Interview Preparation
- **Company insights** - See which companies ask each problem
- **Topic categorization** - Practice specific algorithm types
- **Difficulty progression** - Start easy, build up to hard problems
- **Real problem database** - Curated list of popular LeetCode problems

## 🎯 Use Cases

### 🛫 **Offline Practice**
- Airplane flights, train rides, anywhere without internet
- Coffee shops with unreliable WiFi
- Focus sessions without online distractions

### 🤖 **AI-Powered Learning**
- Collaborate with AI to understand algorithms
- Get code reviews and optimization suggestions
- Debug complex solutions with AI assistance
- Learn patterns and techniques through conversation

### 🔧 **Development Environment**
- Use your preferred IDE and extensions
- Full debugging capabilities
- Custom test cases and edge case exploration
- Integration with your development workflow

### 📈 **Skill Building**
- Systematic practice with progress tracking
- Focus on specific topics or difficulty levels
- Build confidence before official submissions
- Create a personal library of solved problems

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Yarn or npm
- Your favorite code editor

### Installation
```bash
git clone https://github.com/username/local-leetcode-trainer
cd local-leetcode-trainer
yarn install
```

### Your First Problem
```bash
# Get a challenge
yarn challenge easy

# This creates: easy/problem-name/problem-name.js
# Start coding your solution!

# Test it
yarn test easy/problem-name

# When ready, open LeetCode to submit
yarn open easy/problem-name

# Mark as completed
yarn complete easy/problem-name
```

## 🤝 Contributing

We'd love your help making this even better! Here are ways to contribute:

- **Add more problems** - Expand the problem database
- **Improve test cases** - Add better edge cases and examples
- **Enhance scripts** - Make the tools even more powerful
- **Documentation** - Help others get started
- **Bug reports** - Found an issue? Let us know!

## 📝 License

MIT License - feel free to use this for your own practice and share with others!

## 🙏 Acknowledgments

- LeetCode for the amazing problem platform
- The coding community for inspiration and feedback
- AI assistants for making learning more interactive

---

**Happy Coding! 🎉**

*Practice anywhere, learn with AI, submit with confidence.*