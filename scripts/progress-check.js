#!/usr/bin/env node

/**
 * Progress Check Script
 * Shows user progress and congratulates them if they've completed all challenges
 */

const fs = require('fs');
const path = require('path');
const { getAllProblems, getStatistics } = require('./dynamic/problems/index.js');

function getCompletedProblems() {
  const completed = { easy: [], medium: [], hard: [] };
  const projectRoot = process.cwd();

  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const completedPath = path.join(projectRoot, difficulty, 'completed');
    
    if (fs.existsSync(completedPath)) {
      const completedDirs = fs.readdirSync(completedPath).filter(item => {
        const itemPath = path.join(completedPath, item);
        return fs.statSync(itemPath).isDirectory();
      });
      completed[difficulty] = completedDirs;
    }
  });

  return completed;
}

function getActiveProblemCount() {
  const active = { easy: 0, medium: 0, hard: 0 };
  const projectRoot = process.cwd();

  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const difficultyPath = path.join(projectRoot, difficulty);
    
    if (fs.existsSync(difficultyPath)) {
      const dirs = fs.readdirSync(difficultyPath).filter(item => {
        const itemPath = path.join(difficultyPath, item);
        return fs.statSync(itemPath).isDirectory() && item !== 'completed';
      });
      active[difficulty] = dirs.length;
    }
  });

  return active;
}

function main() {
  console.log('🎯 Local LeetCode Trainer - Progress Check\n');

  // Get database statistics
  const stats = getStatistics();
  const completed = getCompletedProblems();
  const active = getActiveProblemCount();

  // Calculate totals
  const totalCompleted = completed.easy.length + completed.medium.length + completed.hard.length;
  const totalActive = active.easy + active.medium + active.hard;
  const totalAttempted = totalCompleted + totalActive;

  console.log('📊 Your Progress:');
  console.log(`Total Problems Available: ${stats.total}`);
  console.log(`Problems Attempted: ${totalAttempted}`);
  console.log(`Problems Completed: ${totalCompleted}`);
  console.log(`Problems In Progress: ${totalActive}`);
  console.log();

  // Detailed breakdown
  console.log('📈 Breakdown by Difficulty:');
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const availableCount = stats[difficulty];
    const completedCount = completed[difficulty].length;
    const activeCount = active[difficulty];
    const percentage = availableCount > 0 ? Math.round((completedCount / availableCount) * 100) : 0;
    
    console.log(`  ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}: ${completedCount}/${availableCount} completed (${percentage}%) + ${activeCount} active`);
  });
  console.log();

  // Progress percentage
  const overallPercentage = Math.round((totalCompleted / stats.total) * 100);
  console.log(`🎯 Overall Completion: ${overallPercentage}%`);

  // Progress bar
  const progressBarLength = 20;
  const filledLength = Math.round((totalCompleted / stats.total) * progressBarLength);
  const progressBar = '█'.repeat(filledLength) + '░'.repeat(progressBarLength - filledLength);
  console.log(`Progress: [${progressBar}] ${totalCompleted}/${stats.total}`);
  console.log();

  // Congratulations or encouragement
  if (totalCompleted === stats.total) {
    console.log('🎉🎉🎉 CONGRATULATIONS! 🎉🎉🎉');
    console.log();
    console.log('🏆 You have completed ALL available challenges!');
    console.log('🚀 You have mastered 200+ algorithmic problems!');
    console.log('💪 You are now in the top tier of software engineers!');
    console.log();
    console.log('🎓 What\'s Next?');
    console.log('  • Graduate to LeetCode Premium for specialized practice');
    console.log('  • Focus on system design and advanced topics');
    console.log('  • Add custom problems using the same structure');
    console.log('  • Use lct hint and lct learn for continued learning');
    console.log();
    console.log('🌟 You\'ve achieved algorithmic mastery - congratulations!');
  } else if (overallPercentage >= 75) {
    console.log('🔥 Excellent Progress!');
    console.log('You\'re in the final stretch! Keep going!');
  } else if (overallPercentage >= 50) {
    console.log('💪 Great Progress!');
    console.log('You\'re halfway there! You\'re building solid foundations!');
  } else if (overallPercentage >= 25) {
    console.log('🌱 Good Start!');
    console.log('You\'re making steady progress! Keep practicing!');
  } else {
    console.log('🚀 Just Getting Started!');
    console.log('Every expert was once a beginner. Keep coding!');
  }

  console.log();
  console.log('💡 Tips:');
  console.log('  • Use `lct challenge easy` to get new problems');
  console.log('  • Use `lct hint <problem>` for guidance');
  console.log('  • Use `lct complete <problem>` to mark as done');
  console.log('  • Focus on understanding patterns, not just solving');
}

main();