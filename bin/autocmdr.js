#!/usr/bin/env node

// TODO: Add logger (catipiller)
// TODO: Unit tests
// TODO: Support grunt/automaton tasks?
// TODO: Properly handle async actions
// TODO: Autoload renderers?

// node
var fs 				= require('fs');
var path			= require('path');

// NPM
var program         = require('commander');

// local
var pkg             = require('../package.json');

program
    .version(pkg.version)
    .usage('[options] <cmd>')
    // turn off repl cmd capture
    .option('-d, --debug', "enable debugger");

loadCmds(program);

// TODO: Autoload npm　files

function getCmdFromFile(filepath) {
	// TODO: Check if file exists
	var cmdFunc = require(filepath);
	// TODO: Check if require returned a function

	if(typeof cmdFunc == "function") {
		cmdFunc(program);	// This adds the command to this program
	}
	// TODO: Else error
}

function loadCmds(program) {
	//console.log('Loading commands');
	var dirpath = path.join(process.cwd(), './cmds/');
	// TOD: Test if path exists

	fs.readdirSync(dirpath).forEach(function(filename) {
		getCmdFromFile(path.join(dirpath,filename));
	});

}

program
    .parse(process.argv);