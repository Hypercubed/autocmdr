autocmdr [![Build Status](https://secure.travis-ci.org/Hypercubed/autocmdr.png?branch=master)](https://travis-ci.org/Hypercubed/autocmdr) [![NPM version](https://badge.fury.io/js/autocmdr.png)](http://badge.fury.io/js/autocmdr) [![Code Climate](https://codeclimate.com/github/Hypercubed/autocmdr.png)](https://codeclimate.com/github/Hypercubed/autocmdr)
=============

[![NPM](https://nodei.co/npm/autocmdr.png?downloads=true)](https://nodei.co/npm/autocmdr/)

autocmdr is a both a command line interface for running tasks and a set of components for building CLIs.  autocmdr is designed to work with [generator-commander](https://github.com/Hypercubed/generator-commander) to enable easily building of commander.js command line apps. 

autocmdr itself was partially built using autocmdr/[generator-commander](https://github.com/Hypercubed/generator-commander).  Please also see the obligatory todo app here [todo-md](https://github.com/Hypercubed/todo-md) (Works with GFM task lists!!).

Warning... The usage is changing rapidly.  I'm working towards a [0.1.0](https://github.com/Hypercubed/autocmdr/issues?milestone=1) release soon.  Feedback is welcome.

# Introduction

The diverse ecosystem of modules available for node.js through npm make it a great tool for the rapid development of a variety of tools including useful command line interfaces.  [Commander.js](https://github.com/visionmedia/commander.js) from [visionmedia](https://github.com/visionmedia) is an excellent node.js command line parser that, using a natural, clean and highly readable syntax, allows for easy development of versatile self-documenting command line interfaces (CLIs).  However, a command line parser is just the beginning.  Many CLIs will inevitably need to include additional components such as debug logging, configuration management, and other CLI type actions.  autocmdr is a command line tool that implements these modules, so you don't have too.  In fact using the autocmdr executable all you need to do is add commands to your local directory and autocmdr will load them automatically along with a reasonable set of additional support components.  Using autocmdr along with [yo](https://github.com/yeoman/yo) and [generator-commander](https://github.com/Hypercubed/generator-commander) provides tools for easily building command components and full CLI applications.  This includes converting a detached set of command components into a independent CLI application that uses autocmdr (along with all it's support modules) as a library.

## Philosophy ad Workflow

**Building excellent command tools using excellent tools.  Using the right tool for the right task**

[commander.js](https://github.com/visionmedia/commander.js) is an node.js command line parser from [visionmedia](https://github.com/visionmedia).

autocmdr is a set of components that add interfaces and support to commander.js based applications built by Hypercubed (me).

[yo](https://github.com/yeoman/yo) is a scaffolding tool built by Google.

[generator-commander](https://github.com/Hypercubed/generator-commander) is a commander.js application generator for Yo also built by Hypercubed.

Yo, together with the commander generator, makes it easy to scaffold complete command line tools that uses commander.js command line parser and autocmdr components to enable great command line interfaces.

# Usage

## Summary

Essentially autocmdr, like most node.js modules, works in two modes; executable (command line) mode and library (require) mode.  In executable mode autocmdr will load any commands located in the current working directory's (cwd's) `cmds/` folder.  By convention each file in the `cmds/` directory corresponds to one commander.js command, although this is not necessary.  In this mode it is not necessary to install autocmdr in the current working directory, you are using the global autocmdr executable with the local `cmds/` commands.

In library mode a commander.js based CLI executable has access to autocmdr components extending its interface.

## Using autocmdr as a task runner

Install autocmdr globally

    npm install -g Hypercubed/autocmdr

When running in executable mode all commands located in the `cmds/` folder of the current working directory are automatically loaded.  These commands can be be run by invoking `autocmdr commandname`.  `autocmdr --help` will list help on these local commands.  By using the globally installed `autocmdr` executable the rest of your project remains untouched so you can add commands to augment existing projects.

## Using generator-commander to add command components

Install yo and generator-commander

    npm install -g yo generator-commander

using yo and generator-commander you can add commands to the current working directory's `cmds/` folder.  Referring to the example below `yo commander:command mycmd` will add the `mycmd` command to the cwd's `cmd/` directory.  The `autocmdr mycmd` call executes the `mycmd` command.  If you change to another directory these commands are no longer available.

    $ mkdir example && cd example
    $ autocmdr --help

      Usage: autocmdr [options] [command]

      Commands:

        config [key] [value]   Get and set options
        completion             Print command completion script

      Options:

        -h, --help     output usage information
        -d, --debug    enable debugger
        -V, --version  output the version number

      Bug reports, suggestions, updates:
       https://github.com/Hypercubed/autocmdr/issues

    $ yo commander:command mycmd
	
	[?] Command name: mycmd
	[?] version: 0.0.0
	[?] description: A commander command
	   create cmds/mycmd.js

	I'm all done. Add `require('../cmds/mycmd.js')(program);` to your app before program.parse.

    $ autocmdr --help

      Usage: autocmdr [options] [command]

      Commands:

        mycmd [options]        A commander command
        config [key] [value]   Get and set options
        completion             Print command completion script

      Options:

        -h, --help     output usage information
        -d, --debug    enable debugger
        -V, --version  output the version number

      Bug reports, suggestions, updates:
       https://github.com/Hypercubed/autocmdr/issues

    $ autocmdr mycmd
    $ cd ..
    $ autocmdr mycmd
    $ error:    'mycmd' is not a known command. See 'autocmdr --help'.

## Using generator-commander

If a set of commands in a folder are useful globally you can convert a set of tasks to an self contained commander.js command line application.  Notice after running `yo commander` the previously created command `mycmd` is available within the newly created `example` application.

1. Create an independent commander.js based app with autocmdr default plug-ins.

	    $ cd example
	    $ yo commander
	    
		[?] Name (must be only letters, spaces, or dashes) example
		[?] Version: 0.0.0
		[?] Description: A commander CLI app
		[?] GitHub username:
		[?] license: MIT
		>[x] Logger (adds a Winston logger)
		 [x] Commander loader (automatically loads commands from cmds/ directory)
		 [x] Autocompletion (adds command line autocompletion)
		 [x] Package (load reasonable defaults from your application's package.json)
		 [x] Config (adds a config command)
		 [x] Help (adds a `did you mean` messege when an unknown command is given)
		  
		   create package.json
		   create bin/example
		   create Readme.md
		   create test/example.js
		   create .editorconfig
		   create .jshintrc
		   create .gitignore
		   create .travis.yml
	
		I'm all done. Running npm install for you to install the required dependencies. If this fails, try running the command yourself.
	    
	    $ ./bin/example --help
	    
	      Usage: example [options] [command]
	      
	      Commands:
	        mycmd [options]        A commander command
	        config [key] [value]   Get and set options
	        completion             Print command completion script
	    
	      Options:
	        -h, --help     output usage information
	        -d, --debug    enable debugger
	        -V, --version  output the version number

2. (Optional) Make it global

	    $ npm link
	    $ cd ..
	    $ example --help
	
	      Usage: example [options] [command]
	
	      Commands:
	        mycmd [options]        A commander command
	        config [key] [value]   Get and set options
	        completion             Print command completion script
	
	      Options:
	        -h, --help     output usage information
	        -d, --debug    enable debugger
	        -V, --version  output the version number

The new executable you just created, when you include the autocmdr components, will have access to the autocmdr features as well as the commands in the `cmds/` folder.  Edit `bin/example` to change what components are loaded.

# Commander.js components

autocmdr components are node.js modules that export a single initialization function.  This function is called with a commander.js program and an optional options object.  Components have a simple syntax that doesn't deviate far from the syntax established by commander.js itself. See autocmdr's [example commands](https://github.com/Hypercubed/autocmdr/tree/master/cmds) and [lib](https://github.com/Hypercubed/autocmdr/tree/master/lib) for examples.

## Commands

The most basic form of a command component is shown below.  Within the exported function a single command is added to the commander.js `program` as you would in any other commander.js program (see [commander.js api documentation](http://visionmedia.github.io/commander.js/)).  

    module.exports = function(program) {

        program
            .command('name')
            .version('version')
            .description('description')
            .action(function(args){
                // Do something
            });
    
    };

## Components

autocmdr component modules have the same structure as command modules.  The only difference is that they are not designed to be automatically loaded.  Plugins are loaded using node's require function again exporting a single initialization function; this time accepting an optional options object as the second parameter.  Below are the built-in autocmdr plug-ins.

    module.exports = function(program, options) {

        // Do plug-in stuff here
    
    };

# autocmdr supplied components

## loader

This component is what loads the `cmds/` modules. 

Adding `require('autocmdr/lib/loader.js')(program)` will load all modules in the `cmds` folder just above the executable.  This path can be overridden by setting the path option; for example `require('autocmdr/lib/loader.js')(program, { path: path.join(process.cwd(), 'cmds/') )` will load modules from the cwd's `/cmds` folder.

## logger

The logger component uses [Winston](https://github.com/flatiron/winston) for logging.

Adding `require('autocmdr/lib/logger')(program)` will add `program.log` to your application.  The plug-in will enable  output to the terminal depending on the log level.  The plug-in will also add the `-d` option to your application to enable debug logging.  Then logging can be done like this:

    program.log('info', 'Hello!');
    program.info('Hello again');
    program.debug('Can you hear me now?');

While this component is optional other components expect to find and instant of Winston at `program.log`.

## config

This component will load [nconf](https://github.com/flatiron/nconf) for handling of configuration.  It will add program.config as an instance of nconf.

Adding `require('autocmdr/lib/config')(program)` will enable this.

While this component is optional other components expect to find and instant of nconf at `program.config`.

## help

This component will use [didyoumean](https://github.com/dcporter/didyoumean.js) to add a "Did you mean:" message to your application when an unknown command is given.

Adding `require('autocmdr/lib/help')(program)` will enable this.

## package

This component will use the will load reasonable defaults (such as description and bug reporting URL) from your application's package.json.

Adding `require('autocmdr/lib/package')(program)` will load the package.json file located one directory above the executable.  You can override this path using the options object.

## completion

This component will use [node-tabtab](https://github.com/mklabs/node-tabtab) to add auto-completion support to your application.

Adding `require('autocmdr/lib/completion')(program)` just before `program.parse(argv);` will will enable auto-completion support.  You will then need to do one of the following to enable auto-completion in your shell.

* Add completion helper to ~/.bashrc (or ~/.zshrc) `pkgname completion >> ~/.bashrc`
* Add completion to current shell `. <(pkgname completion)`

# Share

The modular nature of autocmdr command files makes it easy to share using gist, git or similar tool.  Simply copying files into `cmds/` folder can work in many cases.

# Todo

See [todo.md](https://github.com/Hypercubed/autocmdr/blob/master/todo.md) \( managed using [todo-md](https://github.com/Hypercubed/todo-md) and it's self an [autocmdr](https://github.com/Hypercubed/autocmdr/tree/master/lib) app\)

# License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Copyright (c) 2013 J. Harshbarger
[![Gittip donate button](http://badgr.co/gittip/hypercubed.png)](https://www.gittip.com/hypercubed/ "Donate weekly to this project using Gittip")
[![Paypal donate button](http://badgr.co/paypal/donate.png?bg=%23feb13d)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X7KYR6T9U2NHC "One time donation to this project using Paypal")

# Acknowledgments

autocmdr itself was (partially) built using [autocmdr](https://github.com/Hypercubed/autocmdr).

autocmdr is build on top of [commander.js](https://github.com/visionmedia/commander.js) and inspired by other task managers \( [grunt](https://github.com/gruntjs/grunt), [automaton](https://github.com/IndigoUnited/automaton) \) and command line tools \( [docpad](https://github.com/bevry/docpad), [git](https://github.com/git/git) \).