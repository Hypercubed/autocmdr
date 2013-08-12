# Todo list for [autocmdr](https://github.com/Hypercubed/autocmdr)

_(managed using [todo-md](https://github.com/Hypercubed/todo-md))_

### Priority
- [ ] Finish init function
	- [ ] exec NPM init
	- [ ] exec npm link autocmdr or npm install --save autocmdr
	- [ ] Rename ./.autocmdr and ./autocmdr.js to .myapp and myapp.js	
- [ ] Finish config
	- [ ] First autocmdr .autocmdr then cwd .autocmdr
	- [ ] Scaffold bin/app to use .[appname] as config
- [x] Update readme with better intro
- [x] Update to latest commander.js
- [ ] Add command and plugin file examples to Readme.md
- [ ] Add description of plugins to readme
- [x] Autoload autocmdr.js in cwd.
	- [ ] Document this

### New features/plugins
- [x] tabtab autocompletion
- [x] Did you mean XXX plugin for unknown commands
- [ ] co-prompt
- [ ] file globber
- [ ] Localization!!

### Commander.js

- [ ] String commands (autocmdr list -- show)

### Auto commander:

- [x] Add logger
- [-] Unit tests
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
- [x] Names don't have .js, files do.
- [x] add|edit name[.js], .js is optional
- [ ] Should autocmdr apps should depend only on commander.js, by default
- [x] Load 'plugins' to get logging and easy loading
- [x] Make logger and loader optional?
- [ ] Plugins should require other plugins
- [ ] Build readme?
- [x] add lib/config.js to add config store.
- [ ] add lib/runner.js to execute programs.
- [x] Add did you mean XXX plugin
- [-] Take a look at eco plugin.