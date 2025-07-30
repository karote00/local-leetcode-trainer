const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * AI Teaching Engine - Processes trainer.yaml scripts and provides intelligent guidance
 */
class AITeachingEngine {
  constructor() {
    this.currentScript = null;
    this.userState = {
      attempts: 0,
      passed: false,
      lastOutput: '',
      lastError: '',
      codeHistory: []
    };
  }

  /**
   * Load teaching script for a problem
   */
  loadScript(problemPath) {
    const scriptPath = path.join(problemPath, 'trainer.yaml');
    
    if (!fs.existsSync(scriptPath)) {
      return null; // No teaching script available
    }

    try {
      const scriptContent = fs.readFileSync(scriptPath, 'utf8');
      this.currentScript = yaml.load(scriptContent);
      this.validateScript();
      return this.currentScript;
    } catch (error) {
      console.error(`Error loading teaching script: ${error.message}`);
      return null;
    }
  }

  /**
   * Validate the loaded script structure
   */
  validateScript() {
    if (!this.currentScript) return;

    const required = ['id', 'title', 'difficulty', 'steps'];
    for (const field of required) {
      if (!this.currentScript[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!Array.isArray(this.currentScript.steps)) {
      throw new Error('Steps must be an array');
    }

    const validTypes = ['intro', 'pre_prompt', 'on_run', 'after_success', 'on_request', 'hint'];
    for (const step of this.currentScript.steps) {
      if (!validTypes.includes(step.type)) {
        throw new Error(`Invalid step type: ${step.type}`);
      }
    }
  }

  /**
   * Get introduction message for the problem
   */
  getIntroduction() {
    if (!this.currentScript) return null;
    
    const introStep = this.currentScript.steps.find(step => step.type === 'intro');
    return introStep ? this.formatMessage(introStep.content) : null;
  }

  /**
   * Get pre-coding guidance
   */
  getPrePrompt() {
    if (!this.currentScript) return null;
    
    const prePromptStep = this.currentScript.steps.find(step => step.type === 'pre_prompt');
    return prePromptStep ? this.formatMessage(prePromptStep.content) : null;
  }

  /**
   * Process code execution and provide feedback
   */
  processExecution(code, stdout, stderr, passed) {
    if (!this.currentScript) return null;

    // Update user state
    this.userState.attempts++;
    this.userState.passed = passed;
    this.userState.lastOutput = stdout;
    this.userState.lastError = stderr;
    this.userState.codeHistory.push(code);

    // Find matching on_run steps
    const onRunSteps = this.currentScript.steps.filter(step => step.type === 'on_run');
    
    for (const step of onRunSteps) {
      if (this.evaluateTrigger(step.trigger, code, stdout, stderr, passed)) {
        return this.formatMessage(step.content);
      }
    }

    return null;
  }

  /**
   * Get success message after passing all tests
   */
  getSuccessMessage() {
    if (!this.currentScript) return null;
    
    const successStep = this.currentScript.steps.find(step => step.type === 'after_success');
    return successStep ? this.formatMessage(successStep.content) : null;
  }

  /**
   * Get contextual hints based on current code
   */
  getHint(code) {
    if (!this.currentScript) return null;

    const hintSteps = this.currentScript.steps.filter(step => step.type === 'hint');
    
    for (const step of hintSteps) {
      if (this.evaluateTrigger(step.trigger, code)) {
        return this.formatMessage(step.content);
      }
    }

    return null;
  }

  /**
   * Handle explicit help requests
   */
  handleRequest(query) {
    if (!this.currentScript) return null;

    const requestSteps = this.currentScript.steps.filter(step => step.type === 'on_request');
    
    // Simple keyword matching for now - could be enhanced with NLP
    for (const step of requestSteps) {
      if (step.keywords && step.keywords.some(keyword => 
        query.toLowerCase().includes(keyword.toLowerCase())
      )) {
        return this.formatMessage(step.content);
      }
    }

    return null;
  }

  /**
   * Evaluate trigger conditions
   */
  evaluateTrigger(trigger, code = '', stdout = '', stderr = '', passed = false) {
    if (!trigger) return true;

    try {
      // Create safe evaluation context with helper functions
      const context = {
        code: code || '',
        stdout: stdout || '',
        stderr: stderr || '',
        passed: passed || false,
        attempts: this.userState.attempts || 0
      };

      // Helper functions for safe evaluation
      const helpers = {
        includes: (str, substr) => (str || '').includes(substr),
        match: (str, pattern) => {
          try {
            const regex = new RegExp(pattern);
            return regex.test(str || '');
          } catch (e) {
            return false;
          }
        }
      };

      // Create a safe evaluation function
      const safeEval = (expression) => {
        // Replace method calls with helper functions
        let processedExpr = expression
          .replace(/(\w+)\.includes\(/g, 'helpers.includes($1, ')
          .replace(/(\w+)\.match\(/g, 'helpers.match($1, ');

        // Replace variable references
        processedExpr = processedExpr
          .replace(/\bcode\b/g, 'context.code')
          .replace(/\bstdout\b/g, 'context.stdout')
          .replace(/\bstderr\b/g, 'context.stderr')
          .replace(/\bpassed\b/g, 'context.passed')
          .replace(/\battempts\b/g, 'context.attempts');

        // Use Function constructor for safer evaluation
        return Function('context', 'helpers', `return ${processedExpr}`)(context, helpers);
      };

      return safeEval(trigger);
    } catch (error) {
      console.error(`Error evaluating trigger "${trigger}": ${error.message}`);
      return false;
    }
  }

  /**
   * Format message with dynamic content
   */
  formatMessage(content) {
    if (!content) return '';
    
    return content
      .replace(/\${attempts}/g, this.userState.attempts)
      .replace(/\${difficulty}/g, this.currentScript?.difficulty || 'unknown')
      .trim();
  }

  /**
   * Reset state for new problem
   */
  reset() {
    this.currentScript = null;
    this.userState = {
      attempts: 0,
      passed: false,
      lastOutput: '',
      lastError: '',
      codeHistory: []
    };
  }

  /**
   * Get current script metadata
   */
  getScriptInfo() {
    if (!this.currentScript) return null;
    
    return {
      id: this.currentScript.id,
      title: this.currentScript.title,
      difficulty: this.currentScript.difficulty,
      tags: this.currentScript.tags || [],
      language: this.currentScript.language || 'javascript'
    };
  }
}

module.exports = AITeachingEngine;