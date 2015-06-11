'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('generator-node-vscode-types:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ node12: true, mocha: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'typings/node.d.ts',
      'typings/mocha.d.ts'
    ]);
    assert.fileContent('typings/node.d.ts', /\/\/ Type definitions for Node.js v0.12.0/);
    assert.fileContent('typings/mocha.d.ts', /\/\/ Type definitions for mocha 2.0.1/);
  });
});
