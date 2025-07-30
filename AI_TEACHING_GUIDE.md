# 🤖 AI Teaching System Guide

The Local LeetCode Trainer now includes an intelligent AI teaching system that provides proactive, contextual guidance while you solve coding problems. This system uses YAML-based teaching scripts to create personalized learning experiences.

## 🎯 Features

- **Proactive Guidance**: AI analyzes your code and provides hints without being asked
- **Contextual Feedback**: Responses based on your current approach and progress
- **Progressive Hints**: Guidance that adapts to your skill level and attempts
- **Error Analysis**: Intelligent interpretation of runtime errors and debugging help
- **Success Coaching**: Celebration and next steps when you solve problems

## 🚀 Quick Start

### Start an AI-Guided Challenge

```bash
# Start AI tutoring for a specific problem
lct ai-challenge two-sum

# Or use the short alias
lct ai two-sum
```

### Get AI Help Anytime

```bash
# General help
lct ai-help

# Specific question
lct ai-help "I don't understand hash maps"
```

### Run the Demo

```bash
# See the AI teaching system in action
node scripts/demo-ai-teaching.js
```

## 📚 How It Works

### 1. Teaching Scripts (trainer.yaml)

Each problem can have a `trainer.yaml` file that defines the AI's teaching behavior:

```yaml
id: two-sum
title: Two Sum
difficulty: easy
tags: [array, hash-table]
language: javascript

steps:
  - type: intro
    content: |
      🎯 **Two Sum Challenge**
      This is a fundamental interview problem!
      Think about different approaches: brute force vs optimized.

  - type: hint
    trigger: code.includes('for') && !code.includes('Map')
    content: |
      💡 **Optimization Hint**
      Try using a Map for O(1) lookups instead of nested loops!

  - type: on_run
    trigger: passed === true
    content: |
      🎉 **Excellent work!**
      You've mastered the hash table approach!
```

### 2. Step Types

| Type | Purpose | When It Triggers |
|------|---------|------------------|
| `intro` | Problem introduction | When challenge starts |
| `pre_prompt` | Pre-coding guidance | Before user starts coding |
| `hint` | Code-based hints | Based on static code analysis |
| `on_run` | Execution feedback | After code runs |
| `after_success` | Success celebration | After passing all tests |
| `on_request` | Manual help | When user asks for help |

### 3. Trigger Conditions

Triggers use JavaScript-like expressions to determine when to show guidance:

```yaml
# Code analysis triggers
trigger: code.includes('for') && !code.includes('Map')
trigger: code.length < 50

# Execution result triggers  
trigger: passed === true
trigger: stderr.match(/TypeError|undefined/)

# Progress-based triggers
trigger: attempts > 3 && passed === false
```

## 🛠️ Creating Teaching Scripts

### Method 1: Use the Generator

```bash
# Generate a basic teaching script
node scripts/generate-teaching-script.js scripts/dynamic/problems/easy/two-sum basic

# Generate comprehensive script
node scripts/generate-teaching-script.js scripts/dynamic/problems/medium/longest-palindromic-substring comprehensive

# Generate advanced script for hard problems
node scripts/generate-teaching-script.js scripts/dynamic/problems/hard/merge-k-sorted-lists advanced
```

### Method 2: Manual Creation

Create a `trainer.yaml` file in the problem directory:

```
problems/
├── easy/
│   └── two-sum/
│       ├── two-sum.js          # Problem definition
│       └── trainer.yaml        # AI teaching script
```

### Method 3: Copy and Modify

Start with an existing script and customize it:

```bash
# Copy an existing script
cp scripts/dynamic/problems/easy/two-sum/trainer.yaml scripts/dynamic/problems/easy/valid-parentheses/trainer.yaml

# Edit to match your problem
# Update id, title, difficulty, and customize the guidance
```

## 📖 Teaching Script Examples

### Basic Problem (Easy)

```yaml
id: valid-parentheses
title: Valid Parentheses
difficulty: easy
tags: [string, stack]
language: javascript

steps:
  - type: intro
    content: |
      🎯 **Valid Parentheses**
      Check if brackets are properly matched and nested.
      Think about what data structure naturally handles "last in, first out"!

  - type: hint
    trigger: code.includes('for') && !code.includes('stack') && !code.includes('push')
    content: |
      💡 **Stack Hint**
      This problem is perfect for a stack!
      - Push opening brackets onto the stack
      - Pop and match when you see closing brackets

  - type: on_run
    trigger: passed === true
    content: |
      🎉 **Perfect!**
      You've mastered the stack approach for bracket matching!
```

### Advanced Problem (Hard)

```yaml
id: regular-expression-matching
title: Regular Expression Matching
difficulty: hard
tags: [string, dynamic-programming, recursion]
language: javascript

steps:
  - type: intro
    content: |
      🎯 **Regular Expression Matching - Expert Level**
      Implement regex matching with '.' and '*' support.
      This requires deep understanding of recursion or dynamic programming.

  - type: pre_prompt
    content: |
      🚀 **Advanced Strategy**
      Consider these approaches:
      1. **Recursion**: Handle each character case by case
      2. **Dynamic Programming**: Build up solutions for subproblems
      3. **State Machine**: Model the regex as a finite automaton

  - type: hint
    trigger: attempts > 2 && !code.includes('dp') && !code.includes('recursive')
    content: |
      💡 **Algorithm Choice**
      This problem has two main approaches:
      - **Recursive**: Easier to understand, handles cases naturally
      - **DP**: More efficient, avoids redundant computations
      
      Start with recursion to understand the logic!

  - type: on_run
    trigger: passed === false && attempts > 5
    content: |
      🎯 **Complex Problem Guidance**
      This is one of the hardest problems! Break it down:
      1. Handle base cases (empty pattern/string)
      2. Deal with single character matching
      3. Handle the '*' wildcard carefully
      4. Consider all possible matches for '*'
```

## 🎨 Customization Tips

### 1. Problem-Specific Guidance

Tailor your teaching scripts to the specific algorithm or data structure:

```yaml
# For DP problems
- type: hint
  trigger: code.includes('for') && !code.includes('dp')
  content: |
    💡 **Dynamic Programming Pattern**
    1. Define your state: What does dp[i] represent?
    2. Find the recurrence: How does dp[i] relate to previous states?
    3. Handle base cases: What are the initial values?

# For tree problems  
- type: hint
  trigger: code.includes('TreeNode') && !code.includes('recursive')
  content: |
    🌳 **Tree Traversal Hint**
    Tree problems often use recursion:
    - Base case: Handle null nodes
    - Recursive case: Process left and right subtrees
    - Return appropriate values up the call stack
```

### 2. Difficulty-Appropriate Guidance

Adjust the complexity of hints based on problem difficulty:

```yaml
# Easy problems - direct hints
content: "Use a hash map to store numbers you've seen before!"

# Medium problems - strategic guidance  
content: |
  Consider the trade-offs:
  - Time complexity: Can you reduce from O(n²) to O(n)?
  - Space complexity: Is the extra memory worth it?

# Hard problems - high-level approach
content: |
  This requires advanced algorithmic thinking:
  1. What's the core insight that makes this solvable?
  2. How can you break this into smaller subproblems?
  3. What mathematical properties can you exploit?
```

### 3. Progressive Hint System

Create hints that build on each other:

```yaml
# First hint - gentle nudge
- type: hint
  trigger: attempts === 1 && passed === false
  content: "Think about what data structure gives you O(1) lookups..."

# Second hint - more specific
- type: hint  
  trigger: attempts === 2 && passed === false
  content: "A hash map can store the numbers you've seen and their indices!"

# Third hint - almost the solution
- type: hint
  trigger: attempts >= 3 && passed === false
  content: |
    Here's the pattern:
    1. For each number, calculate its complement (target - number)
    2. Check if the complement exists in your hash map
    3. If yes, return the indices. If no, add current number to map.
```

## 🔧 Advanced Features

### 1. Context-Aware Triggers

Use complex conditions to provide precise guidance:

```yaml
# Detect specific coding patterns
trigger: code.includes('nested') && code.match(/for.*for/) && !code.includes('break')

# Combine multiple conditions
trigger: attempts > 2 && stderr.includes('timeout') && code.length > 100

# Check for algorithmic approaches
trigger: code.includes('sort') && difficulty === 'easy'
```

### 2. Dynamic Content

Use template variables in your content:

```yaml
content: |
  You've made ${attempts} attempts on this ${difficulty} problem.
  ${attempts > 3 ? "Don't give up! You're learning valuable debugging skills." : "Keep going!"}
```

### 3. Multi-Language Support

Create scripts for different programming languages:

```yaml
language: python
steps:
  - type: hint
    trigger: code.includes('for') && !code.includes('dict')
    content: |
      🐍 **Python Hint**
      Use a dictionary for O(1) lookups:
      ```python
      seen = {}
      if complement in seen:
          return [seen[complement], i]
      seen[num] = i
      ```
```

## 📊 Best Practices

### 1. Educational Focus

- **Teach concepts, not just solutions**: Help users understand the underlying principles
- **Progressive difficulty**: Start with gentle hints, escalate to more specific guidance
- **Encourage exploration**: Let users discover solutions rather than giving them away

### 2. User Experience

- **Positive tone**: Use encouraging language and celebrate progress
- **Clear formatting**: Use emojis and markdown for visual appeal
- **Actionable advice**: Provide specific, implementable suggestions

### 3. Technical Quality

- **Accurate triggers**: Test your conditions thoroughly
- **Comprehensive coverage**: Handle common error cases and approaches
- **Performance**: Keep trigger evaluations simple and fast

## 🚀 Future Enhancements

The AI Teaching System is designed to be extensible. Future improvements could include:

- **Natural Language Processing**: More sophisticated query understanding
- **Learning Analytics**: Track user progress and adapt guidance
- **Collaborative Features**: Share teaching scripts with the community
- **Multi-Modal Support**: Include diagrams and visualizations
- **Integration with IDEs**: Real-time guidance as you type

## 🤝 Contributing

Want to create teaching scripts for more problems? Here's how:

1. **Choose a problem** that doesn't have a teaching script yet
2. **Analyze the problem** to identify key learning points
3. **Create the script** using the generator or manual approach
4. **Test thoroughly** with different code approaches
5. **Submit a pull request** to share with the community

## 📞 Support

If you encounter issues or have suggestions:

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Share teaching scripts and get feedback
- **Documentation**: Help improve this guide

---

**Happy Learning! 🎓**

The AI Teaching System transforms coding practice from isolated problem-solving into guided learning experiences. Whether you're a beginner learning fundamentals or an expert preparing for interviews, the AI tutor adapts to help you grow.

Start your first AI-guided challenge today:

```bash
lct ai-challenge two-sum
```