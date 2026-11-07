import { spawn } from 'node:child_process';

const rawArgs = process.argv.slice(2);
const cleanArgs = [];
let port = '3000';

for (let i = 0; i < rawArgs.length; i++) {
  if (rawArgs[i] === '-p' || rawArgs[i] === '--port') {
    port = rawArgs[i + 1] || '3000';
    i++;
  } else {
    cleanArgs.push(rawArgs[i]);
  }
}

cleanArgs.unshift('--port', port);

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(npx, ['vite', 'preview', ...cleanArgs], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
