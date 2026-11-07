import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execSync } from 'node:child_process';

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

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

async function waitForServer(retries = 30, interval = 400) {
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

describe('Challenger Suite 1: Apache .htaccess Compliance & Regex Simulation', () => {
  const publicHtaccessPath = path.resolve('public', '.htaccess');
  const distHtaccessPath = path.resolve('dist', '.htaccess');

  it('verifies public/.htaccess and dist/.htaccess exist and are non-empty', () => {
    assert.ok(fs.existsSync(publicHtaccessPath), 'public/.htaccess must exist');
    assert.ok(fs.existsSync(distHtaccessPath), 'dist/.htaccess must exist');
    const pubContent = fs.readFileSync(publicHtaccessPath, 'utf-8');
    const distContent = fs.readFileSync(distHtaccessPath, 'utf-8');
    assert.ok(pubContent.length > 500, 'public/.htaccess must be fully populated');
    assert.strictEqual(distContent, pubContent, 'dist/.htaccess must match public/.htaccess identically');
  });

  it('validates critical mod_rewrite directives for cPanel SPA routing', () => {
    const content = fs.readFileSync(distHtaccessPath, 'utf-8');
    assert.match(content, /RewriteEngine\s+On/i, 'Must have RewriteEngine On');
    assert.match(content, /RewriteBase\s+\//i, 'Must have RewriteBase /');
    assert.match(content, /RewriteRule\s+\^index\\\.html\$\s+-\s+\[L\]/i, 'Must have index.html passthrough');
    assert.match(content, /RewriteCond\s+%{REQUEST_FILENAME}\s+!-f/i, 'Must have !-f condition');
    assert.match(content, /RewriteCond\s+%{REQUEST_FILENAME}\s+!-d/i, 'Must have !-d condition');
    assert.match(content, /RewriteRule\s+\.\s+\/index\.html\s+\[L\]/i, 'Must have rewrite rule to /index.html');
  });

  it('validates MultiViews is explicitly disabled for clean cPanel URLs', () => {
    const content = fs.readFileSync(distHtaccessPath, 'utf-8');
    assert.match(content, /Options[^\n]*-MultiViews/i, 'Options must include -MultiViews to prevent Apache content negotiation errors');
    assert.match(content, /DirectoryIndex\s+index\.html/i, 'DirectoryIndex must be set to index.html');
  });

  it('validates MIME types and caching headers in .htaccess', () => {
    const content = fs.readFileSync(distHtaccessPath, 'utf-8');
    assert.match(content, /AddType\s+application\/javascript\s+js\s+mjs/i, 'Must configure JS/MJS MIME type');
    assert.match(content, /AddType\s+font\/woff2\s+woff2/i, 'Must configure WOFF2 font MIME type');
    assert.match(content, /AddType\s+image\/svg\+xml\s+svg/i, 'Must configure SVG MIME type');
    assert.match(content, /no-cache,\s*no-store,\s*must-revalidate/i, 'Must disable caching for HTML');
    assert.match(content, /max-age=31536000,\s*immutable/i, 'Must cache hashed static assets for 1 year immutable');
    assert.match(content, /X-Content-Type-Options\s+"nosniff"/i, 'Must include X-Content-Type-Options nosniff');
  });

  it('simulates mod_rewrite logic against virtual routes vs physical files', () => {
    const distDir = path.resolve('dist');
    const testCases = [
      { path: '/', isFile: false, isDir: true, expectedTarget: 'DirectoryIndex index.html' },
      { path: '/about', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/doctor', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/services', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/appointment', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/contact', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/privacy-policy', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/admin', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/unknown-route', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/api/test', isFile: false, isDir: false, expectedRewrite: '/index.html' },
      { path: '/logo.svg', isFile: true, isDir: false, expectedRewrite: null },
      { path: '/index.html', isFile: true, isDir: false, expectedRewrite: null },
    ];

    for (const tc of testCases) {
      const physicalPath = path.join(distDir, tc.path.replace(/^\//, ''));
      const actuallyExists = fs.existsSync(physicalPath);
      const isActualFile = actuallyExists && fs.statSync(physicalPath).isFile();
      const isActualDir = actuallyExists && fs.statSync(physicalPath).isDirectory();

      if (tc.isFile) {
        assert.ok(isActualFile, `Physical file expected to exist: ${tc.path}`);
      } else if (!tc.isDir) {
        assert.ok(!actuallyExists, `Virtual route must not exist as physical file on disk: ${tc.path}`);
      }

      // Check rewrite condition: if !-f and !-d -> rewrite to /index.html
      const wouldRewrite = !isActualFile && !isActualDir;
      if (tc.expectedRewrite) {
        assert.ok(wouldRewrite, `Path ${tc.path} must trigger mod_rewrite to /index.html`);
      } else if (tc.isFile) {
        assert.ok(!wouldRewrite, `Physical asset ${tc.path} must NOT be rewritten to /index.html`);
      }
    }
  });
});

describe('Challenger Suite 2: Client Route Registry, Titles & Wildcard 404', () => {
  const appTsxPath = path.resolve('src', 'App.tsx');
  const notFoundPath = path.resolve('app', 'not-found.tsx');

  it('verifies all 8 routes and wildcard * are registered in App.tsx', () => {
    const content = fs.readFileSync(appTsxPath, 'utf-8');
    const requiredRoutes = [
      'path="/"',
      'path="/about"',
      'path="/doctor"',
      'path="/services"',
      'path="/appointment"',
      'path="/contact"',
      'path="/privacy-policy"',
      'path="/admin"',
      'path="*"',
    ];
    for (const r of requiredRoutes) {
      assert.ok(content.includes(r), `App.tsx must register route ${r}`);
    }
  });

  it('validates ROUTE_TITLES maps all 8 paths and provides a clinical 404 fallback', () => {
    const content = fs.readFileSync(appTsxPath, 'utf-8');
    const expectedPaths = ['"/"', '"/about"', '"/doctor"', '"/services"', '"/appointment"', '"/contact"', '"/privacy-policy"', '"/admin"'];
    for (const p of expectedPaths) {
      assert.ok(content.includes(p), `ROUTE_TITLES must map path ${p}`);
    }
    assert.ok(content.includes('DEFAULT_404_TITLE'), 'App.tsx must define DEFAULT_404_TITLE');
    assert.ok(content.includes('404 — Clinical Resource Not Found'), 'DEFAULT_404_TITLE must contain clinical 404 message');
  });

  it('verifies trailing slash normalization logic in DynamicTitle', () => {
    const content = fs.readFileSync(appTsxPath, 'utf-8');
    assert.ok(content.includes('pathname.replace(/\\/+$/, "")'), 'DynamicTitle must normalize trailing slashes');
  });

  it('verifies NotFoundPage content contains clinical badge, hotline, and home CTA', () => {
    const content = fs.readFileSync(notFoundPath, 'utf-8');
    assert.ok(content.includes('404 — Clinical Resource Not Found'), 'NotFound page must include clinical 404 badge');
    assert.ok(content.includes('Return to Home'), 'NotFound page must provide home button');
    assert.ok(content.includes('Call Helpline'), 'NotFound page must provide helpline button');
    assert.ok(content.includes('Immediate Medical Emergency?'), 'NotFound page must provide emergency hotline card');
    assert.ok(content.includes('/appointment'), 'NotFound page must link to appointment booking');
    assert.ok(content.includes('/services'), 'NotFound page must link to services');
    assert.ok(content.includes('/contact'), 'NotFound page must link to contact');
  });
});

describe('Challenger Suite 3: Hash Anchor Handling & DOM Target Alignment', () => {
  const appTsxPath = path.resolve('src', 'App.tsx');
  const howToVisitPath = path.resolve('components', 'home', 'HowToVisit.tsx');
  const servicesPagePath = path.resolve('app', 'services', 'page.tsx');
  const nextLinkPath = path.resolve('src', 'shims', 'next-link.tsx');

  it('verifies ScrollToTop parses hash and targets document element', () => {
    const content = fs.readFileSync(appTsxPath, 'utf-8');
    assert.ok(content.includes('hash.replace("#", "")'), 'ScrollToTop must extract hash element id');
    assert.ok(content.includes('document.getElementById(elementId)'), 'ScrollToTop must query target element');
    assert.ok(content.includes('scrollIntoView({ behavior: "smooth" })'), 'ScrollToTop must call smooth scrollIntoView');
    assert.ok(content.includes('window.scrollTo({ top: 0, left: 0'), 'ScrollToTop must fall back to instant top scroll');
  });

  it('verifies DOM element id="how-to-visit" exists in HowToVisit.tsx', () => {
    const content = fs.readFileSync(howToVisitPath, 'utf-8');
    assert.match(content, /id=["']how-to-visit["']/, 'HowToVisit section must declare id="how-to-visit"');
  });

  it('verifies DOM element id="emergency-ward" exists dynamically in Services page', () => {
    const content = fs.readFileSync(servicesPagePath, 'utf-8');
    assert.match(content, /id=\{service\.id\}/, 'Services page must assign id={service.id} to service cards');
  });

  it('verifies next-link shim properly formats hash and query objects', () => {
    const content = fs.readFileSync(nextLinkPath, 'utf-8');
    assert.ok(content.includes('hashString = hash'), 'formatUrl must handle hash string/object');
    assert.ok(content.includes('URLSearchParams'), 'formatUrl must handle URLSearchParams query objects');
  });
});

describe('Challenger Suite 4: Production Preview Server Deep Links & Wildcards', () => {
  let serverProcess = null;

  before(async () => {
    console.log(`[Challenger Server] Starting preview server on port ${PORT}...`);
    const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    serverProcess = spawn(npx, ['vite', 'preview', '--port', String(PORT), '--host'], {
      stdio: 'pipe',
      shell: true,
    });

    const ready = await waitForServer(40, 500);
    assert.ok(ready, `Server failed to start on ${BASE_URL} within 20s`);
    console.log(`[Challenger Server] Preview server is ready on ${BASE_URL}.`);
  });

  after(() => {
    if (serverProcess && serverProcess.pid) {
      console.log(`[Challenger Server] Killing server PID ${serverProcess.pid}...`);
      killProcessTree(serverProcess.pid);
    }
  });

  it('serves dist/index.html with 200 OK for root /', async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);
    const ct = res.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `Content-Type must be text/html, got ${ct}`);
    const text = await res.text();
    assert.ok(text.includes('<div id="root"'), 'Response must contain #root');
    assert.ok(text.includes('<script type="module"'), 'Response must contain module script');
  });

  it('serves dist/index.html for all 7 deep link routes', async () => {
    const deepRoutes = [
      '/about',
      '/doctor',
      '/services',
      '/appointment',
      '/contact',
      '/privacy-policy',
      '/admin',
    ];

    for (const route of deepRoutes) {
      const res = await fetch(`${BASE_URL}${route}`);
      assert.strictEqual(res.status, 200, `Route ${route} must return status 200`);
      const ct = res.headers.get('content-type') || '';
      assert.ok(ct.includes('text/html'), `Route ${route} Content-Type must be text/html, got ${ct}`);
      const text = await res.text();
      assert.ok(text.includes('<div id="root"'), `Route ${route} must serve SPA index.html containing #root`);
    }
  });

  it('serves dist/index.html for trailing slash paths', async () => {
    const trailingRoutes = ['/about/', '/doctor/', '/services/', '/appointment/'];
    for (const route of trailingRoutes) {
      const res = await fetch(`${BASE_URL}${route}`);
      assert.strictEqual(res.status, 200, `Trailing slash route ${route} must return 200`);
      const text = await res.text();
      assert.ok(text.includes('<div id="root"'), `Trailing slash route ${route} must serve SPA index.html`);
    }
  });

  it('serves dist/index.html for invalid paths to allow client-side 404 routing', async () => {
    const invalidPaths = [
      '/unknown-route',
      '/api/test',
      '/foo/bar',
      '/deep/nested/invalid/path/12345',
      '/clinical-not-found-stress-test',
    ];

    for (const path of invalidPaths) {
      const res = await fetch(`${BASE_URL}${path}`);
      assert.strictEqual(res.status, 200, `SPA fallback must return 200 for ${path}`);
      const text = await res.text();
      assert.ok(text.includes('<div id="root"'), `Invalid route ${path} must serve SPA index.html`);
    }
  });

  it('serves static assets directly with correct MIME types', async () => {
    const logoRes = await fetch(`${BASE_URL}/logo.svg`);
    assert.strictEqual(logoRes.status, 200, '/logo.svg must return 200');
    const logoCt = logoRes.headers.get('content-type') || '';
    assert.ok(logoCt.includes('image/svg+xml'), `/logo.svg MIME must be image/svg+xml, got ${logoCt}`);

    // Read dist/assets to find a js and css file
    const assets = fs.readdirSync(path.resolve('dist', 'assets'));
    const jsFile = assets.find((f) => f.endsWith('.js'));
    const cssFile = assets.find((f) => f.endsWith('.css'));

    assert.ok(jsFile, 'Must have at least one JS bundle in dist/assets');
    assert.ok(cssFile, 'Must have at least one CSS bundle in dist/assets');

    const jsRes = await fetch(`${BASE_URL}/assets/${jsFile}`);
    assert.strictEqual(jsRes.status, 200);
    const jsCt = jsRes.headers.get('content-type') || '';
    assert.ok(jsCt.includes('javascript'), `JS asset MIME must contain javascript, got ${jsCt}`);

    const cssRes = await fetch(`${BASE_URL}/assets/${cssFile}`);
    assert.strictEqual(cssRes.status, 200);
    const cssCt = cssRes.headers.get('content-type') || '';
    assert.ok(cssCt.includes('text/css'), `CSS asset MIME must be text/css, got ${cssCt}`);
  });

  it('handles concurrent burst of 20 requests without error or packet drop', async () => {
    const targets = [
      '/',
      '/about',
      '/doctor',
      '/services',
      '/appointment',
      '/contact',
      '/privacy-policy',
      '/admin',
      '/unknown-route',
      '/logo.svg',
    ];

    const requests = [];
    for (let i = 0; i < 20; i++) {
      const target = targets[i % targets.length];
      requests.push(fetch(`${BASE_URL}${target}`));
    }

    const start = Date.now();
    const responses = await Promise.all(requests);
    const duration = Date.now() - start;

    for (const res of responses) {
      assert.strictEqual(res.status, 200, 'Every request in concurrent burst must succeed with 200');
    }
    console.log(`[Challenger Server] 20 concurrent requests completed in ${duration}ms (avg ${(duration / 20).toFixed(1)}ms/req)`);
  });
});
