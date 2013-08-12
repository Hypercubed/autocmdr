autocmdr
=============

This is a work in progress, experiment, proof of concept, and/or waist of time.

# Description

autocmdr is a command runner, command builder, and command line interface app builder.  autocmdr itself was partially built using autocmdr.  Also see the obligatory todo app here [todo-md](https://github.com/Hypercubed/todo-md) (Works with GFM task lists!!).

Warning... The usage is changing rapidly.  I'm still discovering new ways to use this.  Feedback is welcome.

[![Gittip donate button](http://badgr.co/gittip/hypercubed.png)](https://www.gittip.com/hypercubed/ "Donate weekly to this project using Gittip")
[![Paypal donate button](http://badgr.co/paypal/donate.png?bg=%23feb13d)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X7KYR6T9U2NHC "One time donation to this project using Paypal")

# Introduction

The diverse ecosystem of modules available for node.js through npm make it a great tool the rapid development of a variety of tools including useful command line interfaces.  [Commander.js](https://github.com/visionmedia/commander.js) from [visionmedia](https://github.com/visionmedia) is an excellent node.js command line parser that, using a natural, clean and highly readable syntax, allows for easy development of versatile self-documenting command line interfaces (CLIs).  However, a command line parser is just the beginning.  Many CLIs will inevitably need to include additional modules for debug logging, configuration management, and other CLI type actions.  autocmdr is a command line tool that implements these modules, so you don't have too.  In fact in what I am calling local mode all you need to do is add command modules to your local directory and autocmdr will load them automatically along with a reasonable set of additional support modules.  Furthermore, in global mode autocmdr provides tools for easily building and managing these commands.  This includes converting a detached set of command modules into a semi-independent CLI application that uses autocmdr (along with all it's support modules) as a library.

## Philosophy

autocmdr is a CLI application builder.  autocmdr itself is CLI that includes a reasonable set of support modules that enhance its interface.  It stands to reason that CLIs built using autocmdr would benefit from using these same modules.

## Commands and Plugins

Commands and plugins are simply node.js modules that export a single initialization function.  This function is called passing to it a commander.js program and an optional options object.  Commands and plugins have a simple syntax that doesn't deviate far from the syntax established by commander.js itself. See autocmdr's [commands](https://github.com/Hypercubed/autocmdr/tree/master/cmds) and [plugins](https://github.com/Hypercubed/autocmdr/tree/master/lib) for examples.

# Usage

## Summary

Essentially autocmdr works in three modes.  Local detached mode, global builder mode (accessed using the `-g` switch on the command line), and library mode.  In local mode autocmdr (executing `autocmdr` without the `-g` flag) will run any commands specified in the current working directory's (cwd's) `cmds/` folder.  By convention each file in the `cmds/` directory corresponds to one commander.js command, although this is not necessary.  In this mode it is not necessary to install autocmdr in the current working directory, you are using the global autocmdr executable with the local `cmds/` commands.

In global builder mode (`autocmdr -g`) autocmdr is loaded with commands that enable management of the cwd's command files and building of autocmdr/commader.js CLI apps.  You are still working in the cwd, but using the gloabl commands to manage the local commands.  See below for more details and examples.  In library mode a local commander.js based CLI executable is created that has access to autocmdr plugins (see below).

## Install autocmdr globally

    npm install -g Hypercubed/autocmdr

## Using autocmdr as a task runner　(Local detached mode)

When running in local mode (not using the `-g` flag) all commands located in the `cmds/` folder of the current working directory are automatically loaded.  These commands can be be run by invoking `autocmdr commandname`.  `autocmdr --help` will list help on these local commands.  By using the globally installed `autocmdr` executable the rest of your project remains untouched so you can add commands to augment existing projects.

## Using autocmdr as a command builder (Global builder mode)

In global mode (`-g`) you can add and edit commands to the current working directory's `cmds/` folder.  Refering to the example below notice that `autocmdr -g add mycmd` call is in global mode to add the `mycmd` to the cwd.  The second `autocmdr mycmd` call executes the `mycmd` command.  If you change to another directory these commands are no longer available.

    cd yourproject
    autocmdr -g add mycmd
    autocmdr mycmd
    cd ..
    autocmdr mycmd
    > warn:    'mytask' is not a known command. See 'autocmdr --help'.

Commands available in global mode:

    add <cmdfile>              Create a blank cmdfile.
    edit [options] <cmd>       Edit command file.
    init [options] <name>      Create a new autocmdr application here.
	rm [options] <cmdfile>     Delete a command.
    
    Options:

    -h, --help     output usage information
	-d, --debug    enable debugger
	-V, --version  output the version number
	-g, --global   use global autocmdr tasks

## Using autocmdr as a app builder (Library mode)

If a set of commands in a folder are useful globally you can convert a set of tasks to an semi-independent commander.js command line app.

1. Create an independent autocmdr based app

        cd yourproject
        npm init
        autocmdr -g init myapp
        npm link autocmdr
        ./bin/myapp --help

2. Make it global

        npm link .
        cd anywhere
        myapp --help

The new executable you just created, by default, will have access to the autocmdr plugins as well as the commands in the `cmds/` folder.
    
## Share

The modular nature of autocmdr command files makes it easy to share using gist, git or similar tool.  Simply copying files into `cmds/` folder can work in many cases.

# Todo

See [todo.md](https://github.com/Hypercubed/autocmdr/blob/master/todo.md) \( managed using [todo-md](https://github.com/Hypercubed/todo-md) and it's self an [autocmdr](https://github.com/Hypercubed/autocmdr/tree/master/lib) app\)

# License

  MIT

# Acknowledgments

autocmdr itself was (partially) built using [autocmdr](https://github.com/Hypercubed/autocmdr).

autocmdr is build on top of [commander.js](https://github.com/visionmedia/commander.js) and inspired by other task managers \( [grunt](https://github.com/gruntjs/grunt), [automaton](https://github.com/IndigoUnited/automaton) \) and command line tools \( [docpad](https://github.com/bevry/docpad), [git](https://github.com/git/git) \).
