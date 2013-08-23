var assert = require("assert");
var exec = require('child_process').exec;
var path = require('path');

describe('example bin', function(){
	var cmd = 'node '+path.join(__dirname, '../bin/example')+' ';

	it('--help should run without errors', function(done) {
		exec(cmd+'--help', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('--version should run without errors', function(done) {
		exec(cmd+'--version', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('completion should run without errors', function(done) {
		exec(cmd+'completion', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

	it('config should run without errors', function(done) {
		exec(cmd+'config', function (error, stdout, stderr) {
			assert(!error);
			done();
		});
	});

});