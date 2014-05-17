# Todo list for [autocmdr](https://github.com/Hypercubed/autocmdr)

_(managed using [todo-md](https://github.com/Hypercubed/todo-md))_

### Priority
- [ ] Finish transition to yo/generator-commander
- [ ] Update example using yo
- [?] Finish config
	- [ ] Autocmdr .autocmdr, then cwd's .autocmdr are loaded
	- [ ] -g toggles which is edited but not which is loaded?
	- [-] Scaffold bin/app to use .[appname] as config
	- [x] Document autocmdr config options
	- [-] Default template (add.template, init.template)
	- [-] Use config namespaces (core.editor, add.template, etc)?
- [ ] Readme
	- [x] Update readme with better intro
	- [-] Add command and plug-in file examples to Readme.md
	- [x] Add description of plug-ins to readme
	- [x] Be consistent in Readme (plug-in, plugin vs. component, executable vs. commander.js app vs. cli)
- [ ] Make final decision on "plug-ins"!!
	- [?] Namespace
	- [x] Plugins vs. components
	- [x] Add prompt and eco to plug-ins?
	- [ ] Guidelines for what should be a plug-in / component
- [-] Parse with callback?

### New features / plugins
- [x] tabtab auto-completion
- [x] Did you mean XXX plug-in for unknown commands
- [x] prompter
- [ ] file globber
- [ ] Localization!!  (would be awesome)
- [ ] Progress bar??
- [ ] utile?
- [ ] update-notifier (requires NPM, post 0.1.0).
- [ ] Version check if node_modules/commander > node_modules/autocmdr/commander

### Commander.js

- [ ] String commands (i.e. autocmdr list show do)
- [ ] Hidden commands?

### Auto commander:

- [x] Add logger
- [-] Unit tests
- [-] Support grunt/automaton tasks?
- [-] Support for flatiron plug-ins/commands?
- [ ] Properly handle async actions (parse with callback?)
- [ ] Autoload some mode_modules/.bin? Support external commands?
- [-] Use /bin instead of /cmds? (not for now)
- [-] Should each cmdfile be invokable?  (`./bin/autocmdr somecmd options` = `./cmds/somecmd options`)
- [ ] Properly handle options for subcommands
- [-] create lib/name.js?
- [ ] require to include all tasks in another autocmdr app?
- [ ] Subcommands?, i.e. autocmdr todo <cmd>
- [-] Run add on edit.
- [-] Run edit on add.
- [-] Names don't have .js, files do.
- [-] add|edit name[.js], .js is optional
- [-] Should autocmdr apps depend only on commander.js, by default?
- [x] Load 'plugins' to get logging and easy loading
- [ ] Plug-ins should require other plugins?
- [ ] Make loading components twice safe
- [-] Take a look at render plugin.
- [ ] Update commnder.js (2.0.0  -> 2.2.0)
- [ ] Add grunt {_test_,_watch_,publish}
- [ ] Use nixt for testing
- [ ] Tabs -> spaces