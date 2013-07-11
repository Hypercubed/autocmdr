autocmdr
=============

This is a work in progress, experiment, proof of concept, and/or waist of time.

# Description

Task runner and [commander.js](https://github.com/visionmedia/commander.js) app builder.

# Usage

## Install autocmdr globally


	npm install -g Hypercubed/autocmdr


## Use autocmdr as a task runner

You can add, edit, and run tasks using autocmdr. Autocmdr tasks are stored in a subdirectoy of your project.  All tasks located in the cmds/ of the current working directory are automatically loaded.  As a task runner the rest of your project remains untouched so you can add tasks to existing projects.

	cd yourproject
	autocmdr -g add mytask.js
	autocmdr -g edit mytask.js
	autocmdr mytask


## As an app builder (Not yet)

If your tasks are useful in other projects you can convert a set of tasks to an semi-independant [commander.js](https://github.com/visionmedia/commander.js) app. 

	cd yourproject
	autocmdr -g init myapp
	npm link .
	
	cd somewhere
	myapp mytask

## Usage

	Usage: autocmdr.js [options] <cmd>

	Commands:

    add <cmdfile>          		Create a blank cmdfile.
    cat [options] <cmd>    		List command source
    edit [options] <cmd>   		Edit command file.
    init [options] <name> 		Create a new autocmdr application here.
    rm [options] <cmdfile> 		Delete a command.

	Options:

    -h, --help     output usage information
    -d, --debug    enable debugger
    -V, --version  output the version number
    -d, --debug    enable debugger
    -g, --global   use global autocmdr tasks

## Share

Use git or npm to share.

# License

  MIT
