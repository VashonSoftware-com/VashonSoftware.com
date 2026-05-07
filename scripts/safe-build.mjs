import { spawn } from 'node:child_process';

const MAX_ATTEMPTS = 4;
const RETRY_DELAY_MS = 1200;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetriableEbussy(output) {
    return output.includes('EBUSY') && output.includes('copyfile');
}

async function runAstroBuild() {
    const cmd = 'pnpm astro build';

    return await new Promise((resolve) => {
        const child = spawn(cmd, {
            shell: true,
            cwd: process.cwd(),
            stdio: ['inherit', 'pipe', 'pipe'],
            env: process.env,
        });

        let combined = '';

        child.stdout.on('data', (chunk) => {
            const text = chunk.toString();
            combined += text;
            process.stdout.write(text);
        });

        child.stderr.on('data', (chunk) => {
            const text = chunk.toString();
            combined += text;
            process.stderr.write(text);
        });

        child.on('close', (code) => {
            resolve({ code: code ?? 1, combined });
        });
    });
}

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    if (attempt > 1) {
        console.warn(`\n[build] Retry ${attempt}/${MAX_ATTEMPTS} after transient file lock...`);
    }

    const result = await runAstroBuild();

    if (result.code === 0) {
        process.exit(0);
    }

    const retriable = isRetriableEbussy(result.combined);
    const canRetry = attempt < MAX_ATTEMPTS;

    if (!retriable || !canRetry) {
        process.exit(result.code);
    }

    await sleep(RETRY_DELAY_MS * attempt);
}
