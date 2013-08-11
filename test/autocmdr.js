

var assert = require("assert");
var path = require('path');

var globalCmds = [ 'config', 'completion', 'add', 'edit', 'init', 'rm'  ];

describe('autocmdr', function () {
	var program = require("../");

	it('should be an Commander instance', function () {

		assert(!!program.Command);

		assert(program instanceof program.Command);
	});

	it('should load plugins without errors', function() {
		require('../lib/logger.js')(program);
		require('../lib/package.js')(program, {  path: path.resolve(__dirname, '../package.json') });
		require('../lib/help.js')(program);
		require('../lib/eco.js')(program);
		require('../lib/config.js')(program, {  path: path.resolve(__dirname, '../.autocmdr') });
		require('../lib/completion.js')(program);

		assert(!!program.logger);
		assert(!!program.package);
		assert(!!program.eco);
		assert(!!program.config);

		assert.equal(program.package.description, 'autocmdr');
	});

	it('should load global cmds without errors', function() {
		require('../lib/loader.js')(program, {  path: path.resolve(__dirname, '../cmds/') });

		assert(!!program.loadCmds);

		var cmds = program.commands.map(function(d) { return d._name });
		assert.deepEqual(cmds, globalCmds);

	});

	// TODO: run in test directory
	it('should add local cmds', function() {
		program.parse(['','','add','XXXtest', '-N']);
	});

	//it('should load local cmds', function() {
		//require('../lib/loader.js')(program, {  path: path.resolve(__dirname, '../cmds/') });
		//console.log(program.commands)
	//});

	it('should rm local cmds', function() {
		program.parse(['','','rm','XXXtest']);
	});

});