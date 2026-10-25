import { spawnSync } from "node:child_process";
import path from "node:path";

const testSuites = [
  { name: "Bangladeshi Phone Validation & Boundary Suite", file: "tests/phone-validation.test.mjs" },
  { name: "Emergency Red Color Isolation Suite", file: "tests/color-isolation.test.mjs" },
  { name: "Layout & Clinical Content Verification Suite", file: "tests/content-verification.test.mjs" },
  { name: "Routes & Global App Shell Architecture Suite", file: "tests/routes-and-layout.test.mjs" },
  { name: "Appointment & Contact Forms Specification Suite", file: "tests/appointment-contact-forms.test.mjs" },
  { name: "E2E Scenarios & Cross-Feature Integration Suite", file: "tests/e2e-scenarios.test.mjs" },
];

console.log("===============================================================================");
console.log("  HEALTHCARE HOSPITAL (CHATTOGRAM) — COMPREHENSIVE E2E & SPECIFICATION TEST SUITE");
console.log("===============================================================================\n");

let allPassed = true;
const summary = [];
const overallStart = Date.now();

for (const suite of testSuites) {
  process.stdout.write(`▶ Running [${suite.file}] ... `);
  const suiteStart = Date.now();
  const result = spawnSync(process.execPath, ["--test", suite.file], {
    cwd: path.resolve("."),
    encoding: "utf-8",
  });
  const duration = Date.now() - suiteStart;

  const passed = result.status === 0;
  if (!passed) {
    allPassed = false;
  }

  // Parse pass count from node:test output
  const passMatch = result.stdout.match(/ℹ pass (\d+)/);
  const failMatch = result.stdout.match(/ℹ fail (\d+)/);
  const passCount = passMatch ? parseInt(passMatch[1], 10) : 0;
  const failCount = failMatch ? parseInt(failMatch[1], 10) : 0;

  summary.push({
    suite: suite.name,
    file: suite.file,
    passCount,
    failCount,
    duration,
    status: passed ? "PASS" : "FAIL",
  });

  if (passed) {
    console.log(`PASSED (${duration}ms) [${passCount} checks]`);
  } else {
    console.log(`FAILED (${duration}ms) [${failCount} failures]`);
    console.log(result.stdout || result.stderr);
  }
}

const totalDuration = Date.now() - overallStart;
const totalPasses = summary.reduce((acc, s) => acc + s.passCount, 0);
const totalFails = summary.reduce((acc, s) => acc + s.failCount, 0);

console.log("\n===============================================================================");
console.log("                              TEST EXECUTION SUMMARY                           ");
console.log("===============================================================================");
console.table(
  summary.map((s) => ({
    "Test Suite": s.suite,
    Status: s.status,
    Passed: s.passCount,
    Failed: s.failCount,
    "Duration (ms)": s.duration,
  }))
);

console.log(`\nTotal Checks Executed : ${totalPasses + totalFails}`);
console.log(`Total Passed          : ${totalPasses}`);
console.log(`Total Failed          : ${totalFails}`);
console.log(`Total Execution Time  : ${totalDuration}ms`);
console.log(`Final Suite Verdict   : ${allPassed ? "ALL SUITES PASSED" : "FAILURES DETECTED"}\n`);

process.exit(allPassed ? 0 : 1);
