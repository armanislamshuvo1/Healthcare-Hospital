import { spawn, execSync } from 'node:child_process';

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const routesToTest = [
  { path: '/', expected: [200], name: 'Home page' },
  { path: '/about', expected: [200], name: 'About page' },
  { path: '/doctor', expected: [200], name: 'Doctor profile page' },
  { path: '/services', expected: [200], name: 'Services page' },
  { path: '/appointment', expected: [200], name: 'Appointment page' },
  { path: '/contact', expected: [200], name: 'Contact page' },
  { path: '/_not-found', expected: [200, 404], name: 'Next internal not-found page' },
  { path: '/non-existent-page-test-404', expected: [404], name: 'Nonexistent route 404' },
  { path: '/random/invalid/path/404', expected: [404], name: 'Deep nonexistent route 404' },
];

function killProcessTree(pid) {
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /F /T /PID ${pid}`, { stdio: 'ignore' });
    } else {
      process.kill(-pid, 'SIGKILL');
    }
  } catch {
    // Process might already be dead
  }
}

async function waitForServer(retries = 30, interval = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${BASE_URL}/`);
      if (res.status === 200) {
        return true;
      }
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, interval));
  }
  return false;
}

async function run() {
  console.log(`[test-prod-server] Launching 'npm.cmd run start' on port ${PORT}...`);
  const server = spawn('npm.cmd', ['run', 'start', '--', '-p', String(PORT)], {
    stdio: 'inherit',
    shell: true,
  });

  const pid = server.pid;
  console.log(`[test-prod-server] Server spawned with PID ${pid}`);

  let allPassed = true;
  const results = [];

  try {
    const isReady = await waitForServer();
    if (!isReady) {
      throw new Error(`Server failed to respond on ${BASE_URL} within 15 seconds.`);
    }
    console.log(`[test-prod-server] Server is up and accepting connections.`);

    for (const route of routesToTest) {
      const targetUrl = `${BASE_URL}${route.path}`;
      const startMs = Date.now();
      try {
        const res = await fetch(targetUrl);
        const duration = Date.now() - startMs;
        const text = await res.text();
        const status = res.status;
        const passed = route.expected.includes(status);
        if (!passed) {
          allPassed = false;
        }

        results.push({
          Route: route.path,
          Name: route.name,
          Status: status,
          Expected: route.expected.join(','),
          Passed: passed ? 'PASS' : 'FAIL',
          SizeBytes: text.length,
          DurationMs: `${duration}ms`,
        });
      } catch (err) {
        allPassed = false;
        results.push({
          Route: route.path,
          Name: route.name,
          Status: 'ERR',
          Expected: route.expected.join(','),
          Passed: 'FAIL',
          SizeBytes: 0,
          DurationMs: 'ERR',
        });
      }
    }
  } finally {
    console.log(`[test-prod-server] Terminating server (PID ${pid})...`);
    killProcessTree(pid);
    console.log(`[test-prod-server] Server terminated.`);
  }

  console.log('\n================ HTTP ROUTE AUDIT RESULTS ================');
  console.table(results);

  if (!allPassed) {
    console.error('One or more route tests failed!');
    process.exit(1);
  } else {
    console.log('All route tests passed successfully!');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('[test-prod-server] Fatal error:', err);
  process.exit(1);
});
