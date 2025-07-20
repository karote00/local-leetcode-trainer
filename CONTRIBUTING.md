# Contributing to Local LeetCode Trainer

Thank you for your interest in contributing! This project aims to provide the best offline LeetCode practice experience.

## 🚀 Ways to Contribute

### 🐛 Bug Reports
- Use GitHub Issues to report bugs
- Include steps to reproduce
- Mention your OS and language version

### ✨ Feature Requests
- Suggest new languages to support
- Propose new problem categories
- Request workflow improvements

### 🔧 Code Contributions
- Fork the repository
- Create a feature branch
- Make your changes
- Test thoroughly
- Submit a pull request

## 🛠️ Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/local-leetcode-trainer
cd local-leetcode-trainer
yarn install
```

## 📝 Adding New Languages

To add support for a new language:

1. **Update `scripts/config.js`**:
   - Add language configuration to `LANGUAGE_CONFIGS`
   - Include file extension, test command, and templates

2. **Update test runner**:
   - Add language-specific test execution in `scripts/test-runner.js`

3. **Test thoroughly**:
   - Test problem generation
   - Test execution
   - Test language switching

## 🧪 Testing

Before submitting:
- Test all core commands
- Test language switching
- Verify templates generate correctly
- Check that archived problems remain accessible

## 📋 Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing patterns in the codebase
- Keep functions focused and small

## 🎯 Problem Database

When adding new problems:
- Include accurate difficulty ratings
- Add relevant company tags
- Provide clear descriptions
- Include proper LeetCode links

## 📞 Questions?

Feel free to open an issue for any questions about contributing!