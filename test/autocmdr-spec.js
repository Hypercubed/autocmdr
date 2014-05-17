
var assert = require("assert");
var path = require('path');
var exec = require('child_process').exec;

describe('autocmdr API', function () {
  'use strict';

  var program = require("../");

  it('should be an Commander instance', function () {
    assert(!!program.Command);
    assert(program instanceof program.Command);
  });

  it('should load plugins without errors', function() {
    require('../lib/logger.js')(program);
    require('../lib/package.js')(program, {  path: path.resolve(__dirname, '../package.json'), name: 'autocmdr' });
    require('../lib/help.js')(program);
    require('../lib/config.js')(program, {  path: path.resolve(__dirname, '../.autocmdr') });
    require('../lib/completion.js')(program);

    assert(!!program.log);
    assert(!!program.config);

    assert.equal(program._description, 'autocmdr');
  });

});
