#!/usr/bin/env node

// node
var path			= require('path');

var autocmdr  = require('../');

var argv = autocmdr.normalize(process.argv);

if (argv.indexOf('-g') > -1) {
	autocmdr.loadCmds(path.join(__dirname,'../cmds/'));
} else {
	autocmdr.loadCmds(path.join(process.cwd(), 'cmds/'));
}

autocmdr.parse();