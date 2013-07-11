
// NPM
//var Autocmdr			= require('commander').Command;

// NPM
var Commander 			= require('commander');
var Logger 			= require('caterpillar').Logger;
var Filter 			= require('caterpillar-filter').Filter;
var Human 			= require('caterpillar-human').Human;

// node
var fs 				= require('fs');
var path			= require('path');
var util			= require('util');

//exports = module.exports = Autocmdr;

// Autocomander object
function Autocmdr(name) {
	Autocmdr.super_.call(this);

	// Setup program
	var program = this;
	program.option('-d, --debug', "enable debugger");

	var argv = program.normalize(process.argv);
	program.debug = argv.indexOf('-d') > -1;

	// Setup logger
	this.logger = new (Logger)({level: (program.debug) ? 7 : 6 })
	this.logger.pipe(new (Filter)()).pipe(new (Human)()).pipe(process.stdout);

	this.logger.log('debug', 'Debug logging is on');
	if (!global.logger) global.logger = global.logger || this.logger; 
}

util.inherits(Autocmdr, Commander.Command);

exports.Autocmdr = Autocmdr;

exports = module.exports = new Autocmdr();

// Add new cammand.
// cmd is a function(Autocmdr)
Autocmdr.prototype.addCmd = function (cmd) {

    if(typeof cmd == "function") {   // TODO: Don't load same command twice?
		cmd(this);	// This adds the command to this program
	}

    return this;
};

// Load tasks in a given folder.
Autocmdr.prototype.loadCmds = function(dirpath) {
	var program = this;

	if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
		logger.log('debug', 'Loading commands from '+dirpath);
		fs.readdirSync(dirpath).forEach(function(filename) {
			var filepath = path.join(dirpath,filename);
			program.addCmd(require(filepath));
		});
  	} else {
  		logger.log('warn', 'Directory not found '+dirpath);
  	}

  	return this;
}

Autocmdr.prototype.parse = function(argv) {
	argv = argv || process.argv;

	Autocmdr.super_.prototype.parse.call(this, argv);

}



