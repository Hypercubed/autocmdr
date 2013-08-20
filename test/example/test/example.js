var assert = require("assert");
var exec = require('child_process').exec;

describe('example bin', function(){

	it('--help should run without errors', function(done) {
		exec('node ./bin/example --help', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('--version should run without errors', function(done) {
		exec('node ./bin/example --version', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('completion should run without errors', function(done) {
		exec('node ./bin/example completion', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('config should run without errors', function(done) {
		exec('node ./bin/example config', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

});