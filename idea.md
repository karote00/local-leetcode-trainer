# 🧠 Local LeetCode Trainer — AI Teaching Script Guide

This guide defines a **Domain-Specific Language (DSL)** and runtime flow for extending your `local-leetcode-trainer` with intelligent AI-guided learning sessions.

It enables AI agents to proactively coach users while solving LeetCode problems — **without requiring the user to explicitly ask for help**.

---

## 🎯 Purpose

- Lower the barrier for beginners who don’t know how to ask good questions.
- Let AI agents interpret outputs (code, stdout, stderr) and respond with coaching.
- Script the learning experience with triggers and guided feedback.

---

## 📁 Folder Structure

Each LeetCode problem lives in its own folder:

```
problems/
├── subarray-sum-equals-k/
│   ├── solution.ts
│   ├── testcases.json
│   └── trainer.yaml    # AI teaching script (this DSL)
```

---

## 🧾 DSL: `trainer.yaml` (YAML-Based)

### Top-level Metadata

```
id: subarray-sum-equals-k
title: Subarray Sum Equals K
difficulty: medium
tags: [prefix sum, hashmap]
language: typescript
```

---

### `steps:` Array

Each `step` defines one AI action.

#### Step Types:

| `type`          | Description                                                |
|------------------|------------------------------------------------------------|
| `intro`          | Shows problem description or goal.                         |
| `pre_prompt`     | Guidance before user starts coding.                        |
| `on_run`         | Triggers after code runs (based on output or errors).      |
| `after_success`  | Triggered after the user passes all test cases.            |
| `on_request`     | User manually asks for help (e.g., "I don't get sum - k"). |
| `hint`           | Based on static code analysis or logic heuristics.         |

---

### 🔍 Trigger Matching (for `on_run` / `hint`)

You can define conditions like:

```
trigger: stderr.match(/TypeError|undefined/)
trigger: stdout.includes('0') and !code.includes('map')
trigger: passed === false and attempts > 2
```

---

### 📚 Example Full Script

```
id: subarray-sum-equals-k
title: Subarray Sum Equals K
difficulty: medium
tags: [prefix sum, hashmap]
language: typescript

steps:
  - type: intro
    content: |
      The goal is to count how many subarrays sum to `k`.
      Subarrays must be **contiguous**.

  - type: pre_prompt
    content: |
      Try solving it first using a brute-force double loop.
      Then, see if you can optimize using **prefix sums**.

  - type: on_run
    trigger: stderr.match(/undefined/)
    content: |
      It looks like you're trying to access a value in a map that doesn't exist yet.
      Consider initializing the prefix sum map with `{ 0: 1 }`.

  - type: on_run
    trigger: passed === true
    content: |
      Great work! 🎉 You passed all test cases.
      Want to try explaining the time/space complexity out loud?

  - type: hint
    trigger: code.includes('for') and !code.includes('map')
    content: |
      You're looping — good! But this problem becomes much faster if you use a map to count prefix sums.
```

---

Let me know if you'd like a ready-to-use template generator or YAML validator next!
