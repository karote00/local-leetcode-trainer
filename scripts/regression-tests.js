const assert = require('assert');
const { LocalProblemSourceImpl } = require('./dynamic/local-problem-source');
const { getProblemsByDifficulty } = require('./dynamic/problems');

async function testLocalProblemSelection() {
  const easyProblems = getProblemsByDifficulty('easy');
  const easyProblemNames = easyProblems.map(problem => problem.slug || problem.name);

  assert(
    easyProblems.length > 2,
    `Expected recursive problem index to load more than 2 easy problems, got ${easyProblems.length}`
  );
  assert(
    easyProblemNames.includes('summary-ranges'),
    'Expected recursive problem index to include nested easy/summary-ranges problem'
  );
  assert(
    easyProblems.every(problem => problem.difficulty === 'easy'),
    'Expected easy problem selection to exclude problems whose metadata difficulty is not easy'
  );

  const mediumProblemNames = getProblemsByDifficulty('medium').map(problem => problem.slug || problem.name);
  assert(
    mediumProblemNames.includes('binary-tree-level-order-traversal'),
    'Expected difficulty lookup to use problem metadata even when a problem file is misplaced'
  );

  const problemSource = new LocalProblemSourceImpl();
  const target = 'summary-ranges';
  const excludedExceptTarget = easyProblemNames.filter(name => name !== target);
  const selected = await problemSource.getRandomProblem('easy', { exclude: excludedExceptTarget });

  assert.strictEqual(
    selected.name,
    target,
    'Expected random local selection to respect excluded problem names'
  );

  await assert.rejects(
    () => problemSource.getRandomProblem('easy', { exclude: easyProblemNames }),
    /No available local easy problems/,
    'Expected a clear error when all local problems are excluded'
  );
}

async function main() {
  await testLocalProblemSelection();
  console.log('Local problem selection regression tests passed');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
