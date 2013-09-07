autocmdr
=============

autocmdr is a both a command line interface (CLI) for running tasks and a set of components for building CLIs.  autocmdr is designed to work with generator-commander to enable easily building of great CLI apps. 

autocmdr itself was partially built using autocmdr/generator-commader.  Please also see the obligatory todo app here [todo-md](https://github.com/Hypercubed/todo-md) (Works with GFM task lists!!).

Warning... The usage is changing rapidly.  I'm working towards a [0.1.0](https://github.com/Hypercubed/autocmdr/issues?milestone=1) release soon.  Feedback is welcome.

# Introduction

The diverse ecosystem of modules available for node.js through npm make it a great tool the rapid development of a variety of tools including useful command line interfaces.  [Commander.js](https://github.com/visionmedia/commander.js) from [visionmedia](https://github.com/visionmedia) is an excellent node.js command line parser that, using a natural, clean and highly readable syntax, allows for easy development of versatile self-documenting command line interfaces (CLIs).  However, a command line parser is just the beginning.  Many CLIs will inevitably need to include additional components for debug logging, configuration management, and other CLI type actions.  autocmdr is a command line tool that implements these modules, so you don't have too.  In fact in what I am using  the autocmdr executable all you need to do is add command modules to your local directory and autocmdr will load them automatically along with a reasonable set of additional support components.  Using autocmdr along with yoeman and generator-commander provides tools for easily building command components and full CLI applications.  This includes converting a detached set of command components into a semi-independent CLI application that uses autocmdr (along with all it's support modules) as a library.

## Philosophy ad Workflow

Building excellent command tools using excellent tools.

commander.js is an node.js command line parser library.

autocmdr is a set of components that add interfaces and support to commander.js based applications.

Yo is a scaffolding tool built by google.

commander-generator is a commander.js application generator for Yo.

Yo, together with commander generator, makes it easy to scaffold complete command line tools that uses commander.js command line parser and autocmdr components to enable great command line interfaces.

# Usage

## Summary

Essentially autocmdr, like most node.js modules, works in two modes; executable (command line) mode and library (require) mode.  In executable mode autocmdr will load any commands located in the current working directory's (cwd's) `cmds/` folder.  By convention each file in the `cmds/` directory corresponds to one commander.js command, although this is not necessary.  In this mode it is not necessary to install autocmdr in the current working directory, you are using the global autocmdr executable with the local `cmds/` commands.

In library mode a local commander.js based CLI executable has access to autocmdr components extending its interface.

## 
## Using autocmdr as a task runner (Local detached mode)

Install autocmdr globally

    npm install -g Hypercubed/autocmdr

When running in executable mode all commands located in the `cmds/` folder of the current working directory are automatically loaded.  These commands can be be run by invoking `autocmdr commandname`.  `autocmdr --help` will list help on these local commands.  By using the globally installed `autocmdr` executable the rest of your project remains untouched so you can add commands to augment existing projects.

## Using autocmdr as a command builder (Global builder mode)

Install yo and generator-commander

    npm install -g yo generator-commander

using yo and generator-commander you can add commands to the current working directory's `cmds/` folder.  Referring to the example below `yo commander:command mycmd` will add the `mycmd` command to the cwd's cmd/ directory.  The `autocmdr mycmd` call executes the `mycmd` command.  If you change to another directory these commands are no longer available.

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

      Bug reports, suggestions, updates:
       https://github.com/Hypercubed/autocmdr/issues

    > autocmdr mycmd
    > cd ..
    > autocmdr mycmd
    > error:    'mycmd' is not a known command. See 'autocmdr --help'.

## Using generator-commander

If a set of commands in a folder are useful globally you can convert a set of tasks to an semi-independent commander.js command line application.  Notice after running `yo commander` the previously created command `mycmd` is available within the newly created `example` application.

1. Create an independent commander.js based app with autocmdr default plug-ins.

        > cd example
        > yo commander
        
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

The new executable you just created, when you include the autocmdr components, will have access to the autocmdr plugins as well as the commands in the `cmds/` folder.  Edit `bin/example` to change what components are loaded.

# Commander.js components

autocmdr components are node.js modules that export a single initialization function.  This function is called with a commander.js program and an optional options object.  Components have a simple syntax that doesn't deviate far from the syntax established by commander.js itself. See autocmdr's [example commands](https://github.com/Hypercubed/autocmdr/tree/master/cmds) and [lib](https://github.com/Hypercubed/autocmdr/tree/master/lib) for examples.

## Commands

The most basic form of a command component is shown below.  Within the exported function the a single command is added to the commander.js `program` as you would in any other commander.js program (see [commander.js api documentationn](http://visionmedia.github.io/commander.js/)).  

    module.exports = function(program) {

        program
            .command('name')
            .version('version')
            .description('description')
            .action(function(opts){
                // Do something
            });
    
    };

## Components

autocmdr plug-in modules have the same structure as command modules.  The only difference is that they are not designed to be automatically loaded.  Plugins are loaded using node's require function again exporting a single initialization function; this time accepting an optional options object as the second parameter.  Below are the built-in autocmdr plug-ins.

    module.exports = function(program, options) {

        // Do plug-in stuff here
    
    };

### loader

This component is what loads the `cmds/` modules. 

Adding `require('autocmdr/lib/loader.js')(program)` will load all modules in the `cmds` folder just above the executable.  This path can be overridden by setting the path option; for example `require('autocmdr/lib/loader.js')(program, { path: path.join(process.cwd(), 'cmds/') )` will load modules from the cwd's `/cmds` folder.

### logger

The logger component uses [Winston](https://github.com/flatiron/winston) for logging.

Adding `require('autocmdr/lib/logger')(program)` will add `program.log` to your application.  The plug-in will enable  output to the terminal depending on the log level.  The plug-in will also add the `-d` option to your application to enable debug logging.  Then logging can be done like this:

    program.log('info', 'Hello!');
    program.info('Hello again');
    program.debug('Can you hear me now?');

While this component is optional other components expect to find and instant of Winston at `program.log`.

### config

This component will load [nconf](https://github.com/flatiron/nconf) for handling of configuration.  It will add program.config as an instance of nconf.

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

Copyright (c) 2013 Jayson Harshbarger

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

# Acknowledgments

autocmdr itself was (partially) built using [autocmdr](https://github.com/Hypercubed/autocmdr).

autocmdr is build on top of [commander.js](https://github.com/visionmedia/commander.js) and inspired by other task managers \( [grunt](https://github.com/gruntjs/grunt), [automaton](https://github.com/IndigoUnited/automaton) \) and command line tools \( [docpad](https://github.com/bevry/docpad), [git](https://github.com/git/git) \) and (of course) [flatiron](https://github.com/flatiron/flatiron).

[![Gittip donate button](http://badgr.co/gittip/hypercubed.png)](https://www.gittip.com/hypercubed/ "Donate weekly to this project using Gittip")
[![Paypal donate button](http://badgr.co/paypal/donate.png?bg=%23feb13d)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X7KYR6T9U2NHC "One time donation to this project using Paypal")
