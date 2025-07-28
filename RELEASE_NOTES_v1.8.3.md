# Release Notes v1.8.3 - Fix Challenge Command Randomization

## 🔧 Critical Bug Fix

### Challenge Command Now Generates Random Problems
- **Fixed**: `lct c easy 1` was always returning Two Sum instead of random easy problems
- **Root Cause**: Argument parsing logic incorrectly treated `difficulty + number` as problem ID
- **Solution**: Corrected logic to distinguish between count and specific problem requests

## 🎯 Behavior Changes

### Before v1.8.3 (Broken):
```bash
lct c easy 1    # Always returned Two Sum (problem ID 1)
lct c easy 1    # Always returned Two Sum (problem ID 1)  
lct c easy 1    # Always returned Two Sum (problem ID 1)
```

### After v1.8.3 (Fixed):
```bash
lct c easy 1    # Returns random easy problem (e.g., Valid Parentheses)
lct c easy 1    # Returns different random easy problem (e.g., Climbing Stairs)
lct c easy 1    # Returns another random easy problem (e.g., Palindrome Number)
```

## ✅ Maintained Backward Compatibility

All existing functionality still works as expected:

- `lct c 1` → Still gets specific problem ID 1 (Two Sum)
- `lct c two-sum` → Still gets specific problem by name
- `lct c easy 2` → Now correctly gets 2 random easy problems
- `lct c medium 3` → Now correctly gets 3 random medium problems

## 🚀 Impact

### For Users:
- **Variety**: No more getting the same problem repeatedly
- **Learning**: Better practice experience with diverse problems
- **Expectation**: Command now works as users naturally expect

### For Learning:
- Users can practice different problems each session
- Better algorithmic pattern exposure
- More engaging practice experience

## 🔄 No Breaking Changes

This is a pure bug fix that makes the command work as originally intended. No changes to:
- Command syntax
- File structure
- Configuration
- Other functionality

## 📦 Installation

```bash
npm install -g local-leetcode-trainer@1.8.3
# or
yarn global add local-leetcode-trainer@1.8.3
```

## 🎉 Try the Fix

```bash
lct init                    # Set up your project
lct c easy 1               # Get a random easy problem
lct c easy 1               # Get a different random easy problem
lct c easy 1               # Get another different random easy problem
```

You should now see different problems each time! 🎲✨

## 🙏 Thanks

Thanks for reporting this issue! The challenge command now works as expected and provides the variety that makes practice sessions more engaging and educational.