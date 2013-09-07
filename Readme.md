autocmdr [![Build Status](https://secure.travis-ci.org/Hypercubed/autocmdr.png?branch=master)](https://travis-ci.org/Hypercubed/autocmdr) [![NPM version](https://badge.fury.io/js/autocmdr.png)](http://badge.fury.io/js/autocmdr)
=============

This is a work in progress, experiment, proof of concept, and/or waste of time.

# Description

autocmdr is a command runner, command builder, and CLI application builder.  autocmdr itself was partially built using autocmdr.  Also see the obligatory todo app here [todo-md](https://github.com/Hypercubed/todo-md) (Works with GFM task lists!!).

Warning... The usage is changing rapidly.  I'm working towards a [0.1.0](https://github.com/Hypercubed/autocmdr/issues?milestone=1) release soon.  Feedback is welcome.

[![Gittip donate button](http://badgr.co/gittip/hypercubed.png)](https://www.gittip.com/hypercubed/ "Donate weekly to this project using Gittip")
[![Paypal donate button](http://badgr.co/paypal/donate.png?bg=%23feb13d)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X7KYR6T9U2NHC "One time donation to this project using Paypal")

# Introduction

The diverse ecosystem of modules available for node.js through npm make it a great tool the rapid development of a variety of tools including useful command line interfaces.  [Commander.js](https://github.com/visionmedia/commander.js) from [visionmedia](https://github.com/visionmedia) is an excellent node.js command line parser that, using a natural, clean and highly readable syntax, allows for easy development of versatile self-documenting command line interfaces (CLIs).  However, a command line parser is just the beginning.  Many CLIs will inevitably need to include additional modules for debug logging, configuration management, and other CLI type actions.  autocmdr is a command line tool that implements these modules, so you don't have too.  In fact in what I am calling local mode all you need to do is add command modules to your local directory and autocmdr will load them automatically along with a reasonable set of additional support modules.  Furthermore, in global mode autocmdr provides tools for easily building and managing these commands.  This includes converting a detached set of command modules into a semi-independent CLI application that uses autocmdr (along with all it's support modules) as a library.

## Philosophy

autocmdr is a CLI application builder.  autocmdr itself is CLI that includes a reasonable set of support modules that enhance its interface.  It stands to reason that CLIs built using autocmdr would benefit from using these same modules.

# Usage

## Summary

Essentially autocmdr works in three modes.  Local detached mode, global builder mode (accessed using the `-g` switch on the command line), and library mode.  In local mode autocmdr (executing `autocmdr` without the `-g` flag) will load any commands located in the current working directory's (cwd's) `cmds/` folder.  By convention each file in the `cmds/` directory corresponds to one commander.js command, although this is not necessary.  In this mode it is not necessary to install autocmdr in the current working directory, you are using the global autocmdr executable with the local `cmds/` commands.

In global builder mode (`autocmdr -g`) autocmdr is loaded with commands that enable management of the cwd's command files and building of autocmdr/commader.js CLI apps.  You are still working in the cwd, but using the global commands to manage the local commands.  See below for more details and examples.  

In library mode a local commander.js based CLI executable is created that has access to autocmdr plug-ins (see below).

## Install autocmdr globally

    npm install -g Hypercubed/autocmdr

## Using autocmdr as a task runner (Local detached mode)

When running in local mode (not using the `-g` flag) all commands located in the `cmds/` folder of the current working directory are automatically loaded.  These commands can be be run by invoking `autocmdr commandname`.  `autocmdr --help` will list help on these local commands.  By using the globally installed `autocmdr` executable the rest of your project remains untouched so you can add commands to augment existing projects.

## Using autocmdr as a command builder (Global builder mode)

In global mode (`-g`) you can add and edit commands to the current working directory's `cmds/` folder.  Referring to the example below notice that `autocmdr -g add mycmd` call is in global mode to add the `mycmd` to the cwd.  The second `autocmdr mycmd` call executes the `mycmd` command.  If you change to another directory these commands are no longer available.

    > cd example
    > autocmdr -g --help

      Usage: autocmdr [options] [command]

      Commands:

        add [options] [name]   Create a command file.
        edit [options] <name>  Edit command file.
        init [options] [name]  Create a new CLI application.
        rm [options] <cmdfile> Delete a command.
        config [key] [value]   Get and set options
        completion             Print command completion script

      Options:

        -h, --help     output usage information
        -d, --debug    enable debugger
        -V, --version  output the version number
        -g, --global   use global autocmdr tasks

      Bug reports, suggestions, updates:
       https://github.com/Hypercubed/autocmdr/issues

    > autocmdr -g add mycmd

    prompt: name:  (mycmd)
    prompt: description:  ( )
    prompt: version:  (0.0.0)
    info:    Initializing command mycmd at cmds\mycmd.js
    info:    Opening mycmd in editor
    info:    cmds\mycmd.js was saved!

    > autocmdr --help

      Usage: autocmdr [options] [command]

      Commands:

        mycmd [options]
        config [key] [value]   Get and set options
        completion             Print command completion script

      Options:

        -h, --help     output usage information
        -d, --debug    enable debugger
        -V, --version  output the version number
        -g, --global   use global autocmdr tasks

      Bug reports, suggestions, updates:
       https://github.com/Hypercubed/autocmdr/issues

    > autocmdr mycmd
    > cd ..
    > autocmdr mycmd
    > error:    'mycmd' is not a known command. See 'autocmdr --help'.

## Using autocmdr as a app builder (Library mode)

If a set of commands in a folder are useful globally you can convert a set of tasks to an semi-independent commander.js command line application.

1. Create an independent commander.js based app with autocmdr default plug-ins.


        > cd example
        > autocmdr -g init
        
        info:    Initializing  example
        autocmdr: name:  (example)
        autocmdr: version:  (0.0.0)
        autocmdr: description:  (A autocmdr CLI app)
        autocmdr: author:  (J. Harshbarger)
        autocmdr: license:  (MIT)
        autocmdr: Is this OK?:  (yes)
        info:    Adding bin/example
        info:    Adding package.json
        info:    Adding Readme.md
        info:    Adding tests/
        info:    All done.  Now trying to run npm to link to autocmdr.  Run `npm install` if it fails.
        
        > ./bin/example --help
        
          Usage: example [options] [command]
          
          Commands:
            mycmd [options]
            config [key] [value]   Get and set options
            completion             Print command completion script
        
          Options:
            -h, --help     output usage information
            -d, --debug    enable debugger
            -V, --version  output the version number

2. Make it global

        > npm link
        > cd ..
        > example --help

          Usage: example [options] [command]

          Commands:
            mycmd [options]
            config [key] [value]   Get and set options
            completion             Print command completion script

          Options:
            -h, --help     output usage information
            -d, --debug    enable debugger
            -V, --version  output the version number

The new executable you just created, by default, will have access to the autocmdr plugins as well as the commands in the `cmds/` folder.  Edit `bin/example` to change these defaults.

## autocmdr options

You can set options with this the `autocmdr config` command.  `autocmdr config` will list all config variables.  `autocmdr config name` will get a value,  `autocmdr config name value` will set a value.  Currently the following config options are available:

`autocmdr -g config author` will get/set the default cli author name
`autocmdr -g config editor` will get/set the default editor

# Commander.js components

Commands and plug-ins are node.js modules that export a single initialization function.  This function is called with a commander.js program and an optional options object.  Commands and plug-ins have a simple syntax that doesn't deviate far from the syntax established by commander.js itself. See autocmdr's [commands](https://github.com/Hypercubed/autocmdr/tree/master/cmds) and [plug-ins](https://github.com/Hypercubed/autocmdr/tree/master/lib) for examples.

## Command modules

The most basic form of a command module is shown below.  Within the function the commander.js program is manipulated to add a single command as any other commander.js program (see [commander.js api documentationn](http://visionmedia.github.io/commander.js/)).  

    module.exports = function (program) {

        program
            .command('name')
            .version('version')
            .description('description')
            .action(function(opts){
                // Do something
            });
    
    };

## Plug-in modules

autocmdr plug-in modules have the same structure as command modules.  The only difference is that they are not designed to be automatically loaded.  Plugins are loaded using node's require function again exporting a single initialization function; this time accepting an options object as the second parameter.  Below are the built-in autocmdr plug-ins.

    module.exports = function (program, options) {

        // Do plug-in stuff here
    
    };

### loader

This plug-in is what loads the `cmds/` modules. 

Adding `require('autocmdr/lib/loader.js')(program)` will load all modules in the `cmds` folder just above the executable.  This path can be overridden by setting the path option; for example `require('autocmdr/lib/loader.js')(program, { path: path.join(process.cwd(), 'cmds/') )` will load modules from the cwd's `/cmds` folder.

### logger

The logger plug-in uses [Winston](https://github.com/flatiron/winston) for logging.

Adding `require('autocmdr/lib/logger')(program)` will add `program.log` to your application.  The plug-in will enable  output to the terminal depending on the log level.  The plug-in will also add the `-d` option to your application to enable debug logging.  Then logging can be done like this:

    program.log('info', 'Hello!');
    program.info('Hello again');
    program.debug('Can you hear me now?');

While this component is optional other components expect to find and instant of Winston at `program.log`.

### config

This plug-in will load [nconf](https://github.com/flatiron/nconf) for handling of configuration.  It will add program.config as an instance of nconf.

Adding `require('autocmdr/lib/config')(program)` will enable this.

While this component is optional other components expect to find and instant of nconf at `program.config`.

### help

This plug-in will use [didyoumean](https://github.com/dcporter/didyoumean.js) to add a "Did you mean:" message to your application when an unknown command is given.

Adding `require('autocmdr/lib/help')(program)` will enable this.

### package

This plug-in will use the will load reasonable defaults (such as description and bug reporting URL) from your application's package.json.

Adding `require('autocmdr/lib/package')(program)` will load the package.json file located one directory above the executable.  You can override this path using the options object.

### completion

This plug-in will use [node-tabtab](https://github.com/mklabs/node-tabtab) to add auto-completion support to your application.

Adding `require('autocmdr/lib/completion')(program)` just before `program.parse(argv);` will will enable auto-completion support.  You will then need to do one of the following to enable auto-completion in your shell.

* Add completion helper to ~/.bashrc (or ~/.zshrc) `pkgname completion >> ~/.bashrc`
* Add completion to current shell `. <(pkgname completion)`

### prompt
`var prompt = require('autocmdr/lib/prompt')(program)`

### render
`var render = require('autocmdr/lib/render')(program)`

# Questions

Q: Doesn't flatiron do the same thing?  You're even using some flatiron modules!  Why not just use [flatiron](https://github.com/flatiron/flatiron) to build your cli applications.

A: Good question with perhaps a few bad answers.  Basically it boils down to a few core design choices.

- Autocmdr is just for cli applications (for what it's worth).
- I started working on autocmdr before I realized that flatiron it had cli scaffolding support.  As I developed autocmdr I realized more and more how good flatiron was. Only issue I had was it's choice of core support modules.
- Flatiron uses [optimist](https://github.com/substack/node-optimist) for command line parsing.  I felt commander.js was a cleaner api so I build autocmdr using that.
- I haven't quite bought [Broadway](https://github.com/flatiron/broadway)'s' for plug-in definitions.  That could change.  I like that autocmdr's plug-ins and command files are essentially the same things.
- I really like the idea that I can prototype a command line app using autocmdr in local mode before creating a full app.  Flatiron itself cannot do this but I'm sure it would be easy enough to build flatiron based tool that does.  Also, scaffolding a command is not yet available in flatiron.
- Flatiron has a team working on their framework.  Autocmdr is just me.  I work on it in my spare time often late at night.  I do this because I enjoy it.

# Share

The modular nature of autocmdr command files makes it easy to share using gist, git or similar tool.  Simply copying files into `cmds/` folder can work in many cases.

# Todo

See [todo.md](https://github.com/Hypercubed/autocmdr/blob/master/todo.md) \( managed using [todo-md](https://github.com/Hypercubed/todo-md) and it's self an [autocmdr](https://github.com/Hypercubed/autocmdr/tree/master/lib) app\)

# License

  MIT

# Acknowledgments

autocmdr itself was (partially) built using [autocmdr](https://github.com/Hypercubed/autocmdr).

autocmdr is build on top of [commander.js](https://github.com/visionmedia/commander.js) and inspired by other task managers \( [grunt](https://github.com/gruntjs/grunt), [automaton](https://github.com/IndigoUnited/automaton) \) and command line tools \( [docpad](https://github.com/bevry/docpad), [git](https://github.com/git/git) \) and (of course) [flatiron](https://github.com/flatiron/flatiron).
