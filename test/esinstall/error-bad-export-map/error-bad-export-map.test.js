const path = require('path');
const {
  existsPackageJson,
  runTest,
  testLockFile,
  testWebModules,
} = require('../esinstall-test-utils.js');

require('jest-specific-snapshot'); // allows to call expect().toMatchSpecificSnapshot(filename, snapshotName)

describe('error-bad-export-map', () => {
  it('matches the snapshot', async () => {
    // This test doesn't work with Node 10 since it does not support export maps
    if (process.versions.node.startsWith('10.')) {
      return;
    }

    const cwd = __dirname;

    if (existsPackageJson(cwd) === false) return;

    // Run Test
    const {output, snapshotFile} = await runTest(cwd);

    // Test output
    expect(output).toMatchSpecificSnapshot(snapshotFile, 'cli output');

    // Test Lockfile (if one exists)
    await testLockFile(cwd);

    // Cleanup
    const {testAllSnapshots, testDiffs} = testWebModules(cwd, snapshotFile, {
      throwIfNoWebModules: false,
    });

    // Assert that the snapshots match
    testAllSnapshots();

    // If any diffs are detected, we'll assert the difference so that we get nice output.
    testDiffs();
  });
});
