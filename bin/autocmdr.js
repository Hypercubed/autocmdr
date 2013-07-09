#!/usr/bin/env node

// TODO: Add logger (catipiller)
// TODO: Unit tests
// TODO: Support grunt/automaton tasks?
// TODO: Properly handle async actions
// TODO: Autoload renderers?

var loggerlevel = process.argv.indexOf('-d') === -1 ? 6 : 7;  // Need this early

// node
var fs 				= require('fs');
var path			= require('path');

// NPM
var program         = require('commander')
	logger 			= new (require('caterpillar').Logger)({level:loggerlevel}),
	filter 			= new (require('caterpillar-filter').Filter)(),
	human 			= new (require('caterpillar-human').Human)();

// local
var pkg             = require('../package.json');

logger.pipe(filter).pipe(human).pipe(process.stdout);

logger.log('debug', 'Debug logging is on');

// Log messages
/* 
logger.log('emergency', 'this is level 0');
logger.log('emerg', 'this is level 0');
logger.log('alert', 'this is level 1');
logger.log('critical', 'this is level 2');
logger.log('crit', 'this is level 2');
logger.log('error', 'this is level 3');
logger.log('err', 'this is level 3');
logger.log('warning', 'this is level 4');
logger.log('warn', 'this is level 4');
logger.log('notice', 'this is level 5');
logger.log('note', 'this is level 5');
logger.log('info', 'this is level 6');
logger.log('default', 'this is level 6');
logger.log('debug', 'this is level 7');
logger.log('this is level 6, the default level');
logger.log('you','can','also','use','as','many','arguments','as','you','want',1,[2,3],{four:5});
*/

program
    .version(pkg.version)
    .usage('[options] <cmd>')
    // turn off repl cmd capture
    .option('-d, --debug', "enable debugger");

//console.log('debugging level: '+loggerlevel)

loadCmds(function() {
	program
    	.parse(process.argv);
});

// TODO: Autoload npm　files
// TODO: Move to lib

function getCmdFromFile(filepath) {
	// TODO: Check if file exists
	var cmdFunc = require(filepath);
	// TODO: Check if require returned a function

	if(typeof cmdFunc == "function") {
		cmdFunc(program);	// This adds the command to this program
	}
	// TODO: Else error
}

function loadCmds(done) {
	
	var dirpath = path.join(process.cwd(), './cmds/');

	fs.exists(dirpath, function(exists) {
		logger.log('debug', 'Loading commands from '+dirpath);
		if (exists) {
			fs.readdirSync(dirpath).forEach(function(filename) {
				logger.log('debug', 'Loading '+filename);
				getCmdFromFile(path.join(dirpath,filename));
			});
		}
		done();
  	});


}

