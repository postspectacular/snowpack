const path = require('path');
const { install } = require('esinstall');

require('jest-specific-snapshot'); // allows to call expect().toMatchSpecificSnapshot(filename, snapshotName)

describe('package-entrypoints', () => {
  /**
   * Browser configuration
   * https://github.com/defunctzombie/package-browser-field-spec
  */
  it('is able to resolve browser: path configuration', async () => {
    const cwd = __dirname;

    const targets = [
      // "browser": "index.js"
      'browser-path'
    ];

    const { importMap: { imports } } = await install(targets, {
      cwd
    });

    // Loop over every target and ensure we are able to install
    for(let pkg of targets) {
      expect(imports[pkg]).toBeTruthy();
    }
  });

  it('Exports config (preact)', async () => {
    const cwd = __dirname;

    const targets = [
      // The following are object based
      // ./index.js
      'browser-dot-slash-index-js',

      // ./index
      'browser-dot-slash-index',

      // index
      'browser-index',

      // index.js
      'browser-index-js',

      // .
      'browser-dot',

      // ./
      'browser-dot-slash',
      
      // invalid
      'browser-no-valid'
    ];

    const { importMap: { imports } } = await install(targets, {
      cwd
    });

    // Loop over every target and ensure we are able to install
    for(let pkg of targets) {
      expect(imports[pkg]).toBeTruthy();
    }
  });

  it('supports basic exports configuration', async () => {
    const cwd = __dirname;

    const targets = [
      'preact',
      'preact/hooks',
      'preact/debug'
    ];

    const { importMap: { imports } } = await install(targets, {
      cwd
    });

    // Loop over every target and ensure we are able to install
    for(let pkg of targets) {
      expect(imports[pkg]).toBeTruthy();
    }
  });

  it('Supports packages with a dot in the name', async () => {
    const cwd = __dirname;

    const targets = ['pkg-with-dot.in-the-name'];

    const { importMap: { imports } } = await install(targets, {
      cwd
    });

    // Loop over every target and ensure we are able to install
    for(let pkg of targets) {
      expect(imports[pkg]).toBeTruthy();
    }
  });

  it('export . with no slash throws', async () => {
    const cwd = __dirname;

    const targets = ['export-map-dot-no-slash'];

    const run = async () => {
      await install(targets, {
        cwd
      });
    }

    expect(run).rejects.toThrow();
  });


  // Probably need: 
  /** 
   * 	"main": "dist/preact.js",
	"module": "dist/preact.module.js",
	"umd:main": "dist/preact.umd.js",
	"unpkg": "dist/preact.min.js",
  "source": "src/index.js",
  "jsnext:main": "dist/foo.bar",
   */
});
