#!/usr/bin/env node

module.exports = function (program) {

    program
	    .version(pkg.version)
	    .usage('[options] <cmd>')
	    .option('-d, --debug', "enable debugger");

	loadCmds(program);

};

//if (!module.parent) {
	var loggerlevel = process.argv.indexOf('-d') === -1 ? 6 : 7;  // Need this early

	// node
	var fs 				= require('fs');
	var path			= require('path');

	// NPM
	var logger 			= global.logger = new (require('caterpillar').Logger)({level:loggerlevel}),
		filter 			= new (require('caterpillar-filter').Filter)(),
		human 			= new (require('caterpillar-human').Human)();

	// local
	var pkg             = require(path.join(process.mainModule.filename, '../../package.json'));

	logger.pipe(filter).pipe(human).pipe(process.stdout);

	logger.log('debug', 'Debug logging is on', loggerlevel);
    logger.log('debug', "I'm the parent");

    var program         = require('commander');

    module.exports(program);

	var ret = program
		.parse(process.argv);

	//console.log(program);

	// TODO: Default
	if (program.args.length < 1 ) {
		program.emit('*', ['unknown']);
	}

	

//} else {
//    logger.log('warn', "I'm only child");

//}



















// TODO: Autoload npm　files
// TODO: Move to lib

function getCmdFromFile(filepath) {
	logger.log('debug', 'Loading '+filepath);

	// TODO: Check if file exists

	var cmdFunc = require(filepath);

	if(typeof cmdFunc == "function") {   // TODO: Don't load same command twice?
		cmdFunc(program);	// This adds the command to this program
	}
	// TODO: Else error
}

function loadCmdsFromPath(dirpath) {

	if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
		logger.log('debug', 'Loading commands from '+dirpath);
		fs.readdirSync(dirpath).forEach(function(filename) {
			getCmdFromFile(path.join(dirpath,filename));
		});
  	} else {
  		logger.log('debug', 'Directory not found '+dirpath);
  	}
}

function loadCmds(program) {
	var cmdpaths = [];

	if (!module.parent)
		cmdpaths.push(path.join(process.cwd(), './cmds/'));							// Local comands

	//cmdpaths.push(path.join(__dirname, '../cmds/'));							// autocmdr commands

	if (module.parent)
		cmdpaths.push(path.join(process.mainModule.filename, '../../cmds/'));		// This module commands

	cmdpaths
		.filter(function(value, index, array) {								// make unique
			return array.indexOf(value, index + 1) < 0;
		})
		.forEach(loadCmdsFromPath);											// Load

}

