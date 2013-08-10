# Todo list for [autocmdr](https://github.com/Hypercubed/autocmdr)

_(managed using [todo-md](https://github.com/Hypercubed/todo-md))_

### Priority
- [ ] Finish init function
	- [ ] NPM init?
	- [ ] npm link autocmdr vs. npm install --save autocmdr
- [ ] Finish config
	- [ ] First autocmdr .autocmdr then cwd .autocmdr
	- [ ] Scaffold bin/app to use .[appname] as config
- [x] Update readme with better intro
- [ ] Update to latest commander.js

### New features/plugins
- [ ] tabtab autocompletion
- [x] Did you mean XXX plugin for unknown commands
- [ ] co-prompt

### Commander.js

- [ ] String commands (autocmdr list -- show)

### Auto commander:

- [x] Add logger
- [ ] Unit tests
- [ ] Support grunt/automaton tasks?
- [ ] Properly handle async actions
- [ ] Autoload some mode_modules/.bin? Support external commands?
- [ ] Use /bin instead of /cmds?
- [ ] Should each cmdfile be envokable?  (`./bin/autocmdr somecmd options` = `./cmds/somecmd options`)
- [ ] Properly handle options for subcommands
- [-] Git style config options
- [-] create lib/name.js?
- [ ] require('name') to include all tasks in another autocmdr app?
- [ ] Subcommands?, i.e. autocmdr todo <cmd>
- [ ] Run add on edit.
- [x] Run edit on add.
- [ ] Names don't have .js, files do.
- [x] add|edit name[.js], .js is optional
- [ ] Autocmdr apps should depending only on commander, by default
- [x] Load 'plugins' to get logging and easy loading
- [x] Make logger and loader optional?
- [ ] Plugins should require other plugins
- [ ] Build readme?
- [x] add lib/config.js to add config store.
- [ ] add lib/runner.js to execute program.
- [ ] Add did you mean XXX plugin