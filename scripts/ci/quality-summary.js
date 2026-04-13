const fs = require('fs');
const path = require('path');

const junitPath = path.resolve(process.cwd(), 'test-results/junit.xml');
const outputPath = path.resolve(process.cwd(), 'test-results/quality-summary.md');

function extractMetric(xml, pattern, fallback = '0') {
  const match = xml.match(pattern);
  return match?.[1] ?? fallback;
}

function main() {
  if (!fs.existsSync(junitPath)) {
    console.error(`JUnit report not found at ${junitPath}`);
    process.exit(1);
  }

  const xml = fs.readFileSync(junitPath, 'utf8');
  const tests = extractMetric(xml, /tests="(\d+)"/);
  const failures = extractMetric(xml, /failures="(\d+)"/);
  const skipped = extractMetric(xml, /skipped="(\d+)"/);
  const time = extractMetric(xml, /time="([\d.]+)"/);

  const summary = [
    '# Quality Summary',
    '',
    '| Metric | Value |',
    '| --- | --- |',
    `| Total tests | ${tests} |`,
    `| Failures | ${failures} |`,
    `| Skipped | ${skipped} |`,
    `| Duration (s) | ${time} |`,
    '',
    `Generated from \`${path.relative(process.cwd(), junitPath)}\`.`,
  ].join('\n');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, summary, 'utf8');
  console.log(`Quality summary generated at ${outputPath}`);
}

main();
