# Todo list for [autocmdr](https://github.com/Hypercubed/autocmdr)

_(managed using [todo-md](https://github.com/Hypercubed/todo-md))_

### Priority
- [x] Finish init function
	- [-] exec NPM init
	- [x] exec npm link autocmdr or npm install --save autocmdr
	- [-] Rename ./.autocmdr and ./autocmdr.js to .myapp and myapp.js	
- [?] Finish config
	- [-] Global, user global, cwd?
	- [-] Scaffold bin/app to use .[appname] as config
	- [ ] Document autocmdr config options
	- [ ] Default template (add.template, init.template)
	- [ ] Use config namespaces (core.editor, add.template, etc)?
- [x] Update readme with better intro
- [x] Update to latest commander.js
- [-] Add command and plugin file examples to Readme.md
- [x] Add description of plugins to readme
- [-] Autoload autocmdr.js in cwd.
	- [?] Document this
- [ ] Make final decision on "plugins"!!
	- [ ] Namespace
	- [ ] Plugins vs. components
	- [ ] Add prompt and eco to plugins?
	- [ ] Guidelines for what should be a plugin/component
- [ ] Be consistence in Readme (plugin vs. componanet, executable vs. commander.js app vs. cli)

### New features/plugins
- [x] tabtab autocompletion
- [x] Did you mean XXX plugin for unknown commands
- [-] prompter
- [ ] file globber
- [ ] Localization!!  (would be awesome)
- [ ] Progress bar??
- [ ] utile?
- [ ] update-notifier

### Commander.js

- [ ] String commands (autocmdr list show)

### Auto commander:

- [x] Add logger
- [-] Unit tests
- [ ] Support grunt/automaton tasks?
- [ ] Properly handle async actions
- [ ] Autoload some mode_modules/.bin? Support external commands?
- [-] Use /bin instead of /cmds?
- [-] Should each cmdfile be envokable?  (`./bin/autocmdr somecmd options` = `./cmds/somecmd options`)
- [ ] Properly handle options for subcommands
- [-] create lib/name.js?
- [ ] require('name') to include all tasks in another autocmdr app?
- [ ] Subcommands?, i.e. autocmdr todo <cmd>
- [ ] Run add on edit.
- [x] Run edit on add.
- [x] Names don't have .js, files do.
- [x] add|edit name[.js], .js is optional
- [-] Should autocmdr apps depend only on commander.js, by default?
- [x] Load 'plugins' to get logging and easy loading
- [x] Make logger and loader optional?
- [ ] Plugins should require other plugins
- [x] Build readme?
- [x] add lib/config.js to add config store.
- [-] add lib/runner.js to execute programs.
- [x] Add did you mean XXX plugin
- [-] Take a look at eco plugin.