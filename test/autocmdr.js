'use strict';

var assert = require("assert");
var path = require('path');
var exec = require('child_process').exec;

describe('autocmdr API', function () {
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

describe('autocmdr bin', function(){
	var cmd = 'node '+path.join(process.cwd(), './bin/autocmdr')+' ';

	it('--help should run without errors', function(done) {
		exec(cmd+'--help', function (error, stdout, stderr) {
			//console.log('\n');
			//console.log(stdout);

			assert(!error);
			done();
		});
	});

	it('--version should run without errors', function(done) {
		exec(cmd+'--version', function (error, stdout, stderr) {
			//console.log('\n');
			//console.log(stdout);

			assert(!error);
			done();
		});
	});

	it('completion should run without errors', function(done) {
		exec(cmd+'completion', function (error, stdout, stderr) {
			//console.log('\n');
			//console.log(stdout);

			assert(!error);
			done();
		});
	});

	it('config should run without errors', function(done) {
		exec(cmd+'config', function (error, stdout, stderr) {
			//console.log('\n');
			//console.log(stdout);

			assert(!error);
			done();
		});
	});

	it('should return error on unknown command', function(done) {
        this.timeout(4000);

		exec(cmd+'addd', function (error, stdout, stderr) {
			//console.log('\n');
			//console.log(stdout);

			assert(error);
			assert.equal(error.code,1);
			assert(stderr.match(/is not a known command/i));
			done();
		});
	});

	it('should return error on missing command', function(done) {
        this.timeout(4000);

		exec(cmd, function (error, stdout, stderr) {
			//console.log('\n');
			//console.log(stdout);

			assert(error);
			assert.equal(error.code,1);
			assert(stderr.match(/No command specified/i));
			done();
		});
	});

});
