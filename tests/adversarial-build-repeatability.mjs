import { execSync } from 'node:child_process';

const RUNS = 5;
const results = [];

console.log(`Starting ${RUNS} repeatability runs of: npm.cmd run clean && npm.cmd run build\n`);

for (let i = 1; i <= RUNS; i++) {
  console.log(`--- [Run ${i}/${RUNS}] Starting clean + build ---`);
  const startMs = Date.now();
  let exitCode = 0;
  let errorMsg = null;
  let stdout = '';

  try {
    stdout = execSync('npm.cmd run clean && npm.cmd run build', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    exitCode = 0;
  } catch (err) {
    exitCode = err.status ?? 1;
    errorMsg = (err.stderr || err.stdout || err.message || '').trim();
    // Extract ENOENT line if present
    const match = errorMsg.match(/Error:\s*ENOENT[^\n]+/);
    if (match) {
      errorMsg = match[0];
    } else {
      errorMsg = errorMsg.split('\n').slice(-3).join(' ');
    }
  }

  const duration = ((Date.now() - startMs) / 1000).toFixed(1);
  const status = exitCode === 0 ? 'PASS' : 'FAIL';
  console.log(`--- [Run ${i}/${RUNS}] Result: ${status} (code: ${exitCode}) in ${duration}s ${errorMsg ? `| Error: ${errorMsg}` : ''} ---\n`);

  results.push({
    Run: i,
    Status: status,
    ExitCode: exitCode,
    Duration: `${duration}s`,
    Error: errorMsg || 'None (Clean 0)',
  });
}

console.log('================ REPEATABILITY RUN SUMMARY ================');
console.table(results);

const passCount = results.filter((r) => r.Status === 'PASS').length;
const failCount = results.filter((r) => r.Status === 'FAIL').length;
console.log(`\nTotal Runs: ${RUNS} | Passed: ${passCount} | Failed: ${failCount}`);

if (failCount > 0) {
  console.error(`\n[CRITICAL FAILURE] Build pipeline is NOT 100% repeatable. ${failCount}/${RUNS} runs failed with race conditions.`);
  process.exit(1);
} else {
  console.log('\n[SUCCESS] All runs passed with exit code 0.');
  process.exit(0);
}
