autocmdr
=============

This is a work in progress, experiment, proof of concept, and/or waist of time.

# Description

autocmdr is a task runner, task builder, and [commander.js](https://github.com/visionmedia/commander.js) CLI app builder.  autocmdr itself was partially built using [autocmdr](https://github.com/Hypercubed/autocmdr).  Also see the obligitory todo app here [todo-md](https://github.com/Hypercubed/todo-md) (Works with GFM task lists!!)

# Usage

## Summary

Essentially autocmdr works in three modes.  Local mode, global mode (accessed using the `-g` switch on the command line), and library mode.  In local mode autocmdr (executing `autocmdr` without the `-g` flag) will run any commad specified in the current working directory's (cwd's) `cmds/` folder.  By convention each file in the `cmds/` directory corresponds to one commader.js command, although this is not necessary.  In this mode it is not necessary to install autocmdr in the current working directory, you are using the global `autocmdr` with the local `cmds/` commands.

In global mode (`autocmdr -g`) autocmdr is loaded with commands that enable managment of the cwd's `cmds/` files and building of autocmdr/commader.js cli apps.  See below for more details.  In library a local executable is created that has access to autocmdr plugins (see below).

## Install autocmdr globally

    npm install -g Hypercubed/autocmdr

## Using autocmdr as a task runner　(Local mode)

When running in local mode (not using the `-g` flag) all tasks located in the `cmds/` folder of the current working directory are automatically loaded.  These tasks can be be run by invoking `autocmdr`.  `autocmdr --help` will list help on these local commands.  By using the globally installed `autocmdr` executable the rest of your project remains untouched so you can add tasks to augment existing projects.

## Using autocmdr as a task builder (Local mode and global mode)

In global mode (`-g`) you can add and edit commander.js tasks to the current working directory's `cmds/` folder.  See example below.  Notice that `autocmdr -g add mytask.js` call is in global mode to add the `mytask` task to the cwd.  The second `autocmdr mytask` call executes the `mytask` command.  If you change to another directory these commands are no longer available available.

    cd yourproject
    autocmdr -g add mytask
    autocmdr mytask
    cd ..
    autocmdr mytask
    > warn:    'mytask' is not a known command. See 'autocmdr --help'.

Commands available in global mode:

    add <cmdfile>              Create a blank cmdfile.
	cat [options] <cmd>        List command source
	edit [options] <cmd>       Edit command file.
	init [options] <name>      Create a new autocmdr application here.
	rm [options] <cmdfile>     Delete a command.
    
    Options:

    -h, --help     output usage information
	-d, --debug    enable debugger
	-V, --version  output the version number
	-g, --global   use global autocmdr tasks

## Using autocmdr as a app builder (Global and library mode)

If a set of commands in a `cmds/` folder are useful globally you can convert a set of tasks to an semi-independant commander.js command line app.

1. Add an independent autocmdr based app

        cd yourproject
        npm init
        autocmdr -g init myapp
        npm link autocmdr
        ./bin/myapp --help

2. Make it global

        npm link .
        cd anywhere
        myapp --help
    
## Share

Use git or npm to share.  Simply copying files into `cmds/` folder should work in many cases.

# Todo

See [todo.md](https://github.com/Hypercubed/autocmdr/blob/master/todo.md) \( managed using [todo-md](https://github.com/Hypercubed/todo-md) \)

# License

  MIT

# Acknowledgments

autocmdr itself was (partially) built using [autocmdr](https://github.com/Hypercubed/autocmdr).

autocmdr is build on top of [commander.js](https://github.com/visionmedia/commander.js)  and inspired by other task managers \( [grunt](https://github.com/gruntjs/grunt), [automaton](https://github.com/IndigoUnited/automaton) \) and command line tools \( [docpad](https://github.com/bevry/docpad), [git](https://github.com/git/git) \).