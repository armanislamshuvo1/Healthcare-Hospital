import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('cPanel Build & .htaccess Verification', () => {
  const distDir = path.resolve(process.cwd(), 'dist');
  const htaccessPath = path.resolve(distDir, '.htaccess');
  const indexPath = path.resolve(distDir, 'index.html');
  const assetsDir = path.resolve(distDir, 'assets');

  it('verifies dist directory and index.html exist after build', () => {
    assert.ok(fs.existsSync(distDir), 'dist/ directory must exist');
    assert.ok(fs.existsSync(indexPath), 'dist/index.html must exist');
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    assert.ok(indexContent.includes('<div id="root"'), 'index.html must contain #root div');
    assert.ok(indexContent.includes('<script type="module"'), 'index.html must contain module script');
  });

  it('verifies dist/.htaccess exists and contains required cPanel Apache directives', () => {
    assert.ok(fs.existsSync(htaccessPath), 'dist/.htaccess must exist');
    const content = fs.readFileSync(htaccessPath, 'utf-8');

    // Rewrite rules
    assert.ok(content.includes('RewriteEngine On'), 'Must enable RewriteEngine');
    assert.ok(content.includes('RewriteBase /'), 'Must specify RewriteBase /');
    assert.ok(content.includes('RewriteRule ^index\\.html$ - [L]'), 'Must stop rewrite on index.html');
    assert.ok(content.includes('RewriteCond %{REQUEST_FILENAME} !-f'), 'Must check !-f');
    assert.ok(content.includes('RewriteCond %{REQUEST_FILENAME} !-d'), 'Must check !-d');
    assert.ok(content.includes('RewriteRule . /index.html [L]'), 'Must rewrite deep links to /index.html');

    // Options & DirectoryIndex
    assert.ok(content.includes('Options -Indexes'), 'Must disable directory browsing');
    assert.ok(content.includes('-MultiViews'), 'Must disable MultiViews');
    assert.ok(content.includes('DirectoryIndex index.html'), 'Must define DirectoryIndex index.html');

    // MIME types
    assert.ok(content.includes('AddType application/javascript'), 'Must declare JS MIME type');
    assert.ok(content.includes('AddType font/woff2'), 'Must declare woff2 font MIME type');

    // Cache control & security headers
    assert.ok(content.includes('Cache-Control "no-cache, no-store, must-revalidate"'), 'Must disable HTML caching');
    assert.ok(content.includes('max-age=31536000, immutable'), 'Must cache hashed assets');
    assert.ok(content.includes('X-Content-Type-Options "nosniff"'), 'Must include nosniff header');
    assert.ok(content.includes('X-Frame-Options "SAMEORIGIN"'), 'Must include SAMEORIGIN header');
  });

  it('verifies assets directory contains compiled bundle files', () => {
    assert.ok(fs.existsSync(assetsDir), 'dist/assets directory must exist');
    const files = fs.readdirSync(assetsDir);
    const hasJs = files.some((f) => f.endsWith('.js'));
    const hasCss = files.some((f) => f.endsWith('.css'));
    assert.ok(hasJs, 'dist/assets must contain at least one .js bundle');
    assert.ok(hasCss, 'dist/assets must contain at least one .css bundle');
  });
});
