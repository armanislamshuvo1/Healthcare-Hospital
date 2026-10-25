import fs from 'node:fs';
import path from 'node:path';

const targets = ['.next', 'tsconfig.tsbuildinfo', 'node_modules/.cache'];

for (const target of targets) {
  const fullPath = path.resolve(process.cwd(), target);
  try {
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`[clean] Removed ${target}`);
    }
  } catch (err) {
    console.error(`[clean] Failed to remove ${target}:`, err);
  }
}
