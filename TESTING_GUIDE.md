# Testing Guide for Local Development

## Overview
When developing locally, always test with local scripts using `node` directly, NOT with the global `lct` command. The `lct` command uses the globally installed package, while we need to test our local changes.

## Testing Commands

### ✅ Correct - Test Local Changes
```bash
# Generate challenges locally
node scripts/challenge.js easy 1
node scripts/challenge.js medium 2
node scripts/challenge.js hard 1

# Test generated problems locally
node easy/problem-name/problem-name.test.js
node medium/problem-name/problem-name.test.js

# Run other local scripts
node scripts/test-runner.js easy/problem-name
node scripts/simple-challenge.js easy 1
```

### ❌ Incorrect - Uses Global Package
```bash
# These use the globally installed package, NOT your local changes
lct challenge easy 1
lct test easy/problem-name
```

## Test Framework Verification

### 1. Generate a Test Problem
```bash
node scripts/challenge.js easy 1
```

### 2. Check Generated Test Format
The generated test file should have this format:
```javascript
const functionName = require('./problem-name');

// Test cases array - simple and clean
const testCases = [
  {
    description: "Test description",
    input: [param1, param2],
    expected: expectedResult,
    category: "basic"
  }
];

// Simple test runner - pure JavaScript
function runTests() {
  // ... test execution logic
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

// Export for external test runners
module.exports = {
  functionName,
  runTests,
  runAllTests: runTests,
  testCases
};
```

### 3. Test Direct Execution
```bash
node easy/problem-name/problem-name.test.js
```

Expected output:
```
🧪 Running tests for Problem Name

❌ FAIL: Test description
   Input: [param1, param2]
   Expected: expectedResult
   Got: undefined

==================================================
📊 Results: 0 passed, 1 failed
🔧 Some tests failed. Keep working on your solution!
```

### 4. Verify No Jest Dependency
- ✅ Should work with plain Node.js
- ✅ No `describe`, `test`, `expect` functions
- ✅ No external testing framework required

## Development Workflow

1. **Make Changes** to local scripts
2. **Test Locally** with `node scripts/...`
3. **Verify Output** matches expected format
4. **Clean Up** debug logs and temporary files
5. **Commit Changes** when everything works
6. **Release** to npm package

## Common Issues

### Issue: "describe is not defined"
- **Cause**: Using `lct` instead of local scripts
- **Solution**: Use `node scripts/challenge.js` instead

### Issue: Old Jest format generated
- **Cause**: Testing with global package
- **Solution**: Always test locally with `node`

### Issue: Debug logs showing
- **Cause**: Debug code left in scripts
- **Solution**: Remove debug logs before release

## File Structure After Testing
```
project/
├── easy/
│   └── problem-name/
│       ├── problem-name.js (empty solution)
│       ├── problem-name.test.js (pure JS format)
│       └── README.md
├── scripts/
│   ├── challenge.js (updated)
│   ├── dynamic/
│   │   └── problem-manager.js (updated)
│   └── ...
└── TESTING_GUIDE.md (this file)
```

## Before Release Checklist

- [ ] Remove all debug logs from scripts
- [ ] Remove all test challenges/problems
- [ ] Remove temporary files and logs
- [ ] Test with fresh problem generation
- [ ] Verify test framework independence
- [ ] Update version number
- [ ] Commit and push changes
- [ ] Publish to npm