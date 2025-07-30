# GitHub Release Instructions for v1.10.1

## 🚀 Create GitHub Release

### Step 1: Go to GitHub Releases
1. Navigate to: https://github.com/karote00/local-leetcode-trainer/releases
2. Click "Create a new release"

### Step 2: Release Details
- **Tag version**: `v1.10.1` (should auto-populate)
- **Release title**: `🚀 v1.10.1: Expanded Hard Problems Collection`
- **Target**: `main` branch

### Step 3: Release Description
Copy and paste the content from `RELEASE_NOTES_v1.10.1.md` into the description field.

### Step 4: Release Options
- ✅ **Set as the latest release** (checked)
- ✅ **Create a discussion for this release** (optional, but recommended)
- ❌ **Set as a pre-release** (unchecked)

### Step 5: Publish
Click "Publish release"

## 📋 **Quick Copy-Paste Summary**

**Title**: 🚀 v1.10.1: Expanded Hard Problems Collection

**Key Highlights for Description**:
```markdown
## 🎯 Major Improvements

### 🔥 12 New Hard Problems Added
We've significantly expanded our hard problems collection with 12 carefully selected challenging problems that cover essential algorithmic patterns for technical interviews.

### 📊 Updated Problem Statistics
- **Hard Problems**: 18 → **30** (+12 new problems)
- **Total Problems**: 113 → **125** (+12 problems)
- **Hard Collection Progress**: 75% complete (30/40 target)

## ✨ New Hard Problems

### 🔗 **Linked List & Pointers**
- **Reverse Nodes in k-Group** - Advanced linked list manipulation with group reversal

### 📝 **String Algorithms**
- **Text Justification** - Complex string formatting and line distribution
- **Valid Number** - Finite state machine for number validation
- **Interleaving String** - 2D dynamic programming pattern matching
- **Scramble String** - Recursive DP with memoization

### 🏗️ **Dynamic Programming**
- **Distinct Subsequences** - String DP with subsequence counting
- **Palindrome Partitioning II** - Optimization DP for minimum cuts
- **Word Break II** - Backtracking with memoization
- **Burst Balloons** - Interval DP for optimal balloon bursting

### 🔢 **Array & Matrix**
- **Maximal Rectangle** - Matrix algorithms with stack optimization
- **Insert Interval** - Array manipulation and interval merging
- **Count of Smaller Numbers After Self** - Advanced data structures (Binary Indexed Tree/Merge Sort)

## 📦 Installation
```bash
npm install -g local-leetcode-trainer@1.10.1
```

## 🧪 Try the New Problems
```bash
# Try some of the new hard problems
lct challenge reverse-nodes-in-k-group
lct challenge burst-balloons
lct challenge text-justification
lct challenge maximal-rectangle

# Get a random hard problem (now from 30 problems!)
lct challenge hard
```

The Local LeetCode Trainer continues to evolve into the most comprehensive offline coding practice platform! 🚀
```

## 🎯 **Alternative: GitHub CLI Method**

If you have GitHub CLI installed, you can create the release directly:

```bash
# Install GitHub CLI if not already installed
# brew install gh  # macOS
# Or download from: https://cli.github.com/

# Login to GitHub (if not already logged in)
gh auth login

# Create the release
gh release create v1.10.1 \
  --title "🚀 v1.10.1: Expanded Hard Problems Collection" \
  --notes-file RELEASE_NOTES_v1.10.1.md \
  --latest
```

## 📁 **Files to Include**

The release will automatically include:
- ✅ Source code (zip)
- ✅ Source code (tar.gz)
- ✅ All tagged commits and changes

Optional attachments:
- `RELEASE_NOTES_v1.10.1.md` (release notes file)
- `package.json` (package info)

## 🚀 **NPM Publishing**

After creating the GitHub release, publish to npm:

```bash
# Make sure you're logged in to npm
npm whoami

# If not logged in:
npm login

# Publish the package
npm publish

# Verify the publication
npm view local-leetcode-trainer@1.10.1
```

## ✅ **Post-Release Checklist**

- [ ] GitHub release created successfully
- [ ] NPM package published
- [ ] Release notes are accurate and complete
- [ ] Version tags are properly set
- [ ] All 12 new hard problems are included
- [ ] Package.json version updated to 1.10.1
- [ ] Documentation updated if needed