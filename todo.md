# Todo list for [autocmdr](https://github.com/Hypercubed/autocmdr)

_(managed using [todo-md](https://github.com/Hypercubed/todo-md))_

### Priority
- [x] Finish init function
	- [-] exec NPM init
	- [x] exec `npm link autocmdr` or `npm install --save autocmdr`
	- [-] Rename ./.autocmdr and ./autocmdr.js to .myapp and myapp.js
	- [-] Make safe for existing files, read package.json content
	- [-] Options for which files to add during init	
- [?] Finish config
	- [-] Global, user global, cwd?
	- [-] Scaffold bin/app to use .[appname] as config
	- [x] Document autocmdr config options
	- [-] Default template (add.template, init.template)
	- [-] Use config namespaces (core.editor, add.template, etc)?
- [ ] Template
	- [ ] fix autocmdr dependency in package.json
	- [x] fix usage in readme.md
	- [x] help component to template?
- [ ] Readme
	- [x] Update readme with better intro
	- [-] Add command and plug-in file examples to Readme.md
	- [x] Add description of plug-ins to readme
	- [ ] Be consistent in Readme (plug-in, plugin vs. component, executable vs. commander.js app vs. cli)
- [x] Update to latest commander.js
- [-] Autoload autocmdr.js in cwd.
	- [?] Document this
- [ ] Make final decision on "plug-ins"!!
	- [ ] Namespace
	- [ ] Plugins vs. components
	- [ ] Add prompt and eco to plug-ins?
	- [ ] Guidelines for what should be a plug-in / component

### New features / plugins
- [x] tabtab auto-completion
- [x] Did you mean XXX plug-in for unknown commands
- [x] prompter
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
- [ ] Support for flatiron plug-ins/commands?
- [ ] Properly handle async actions
- [ ] Autoload some mode_modules/.bin? Support external commands?
- [-] Use /bin instead of /cmds?
- [-] Should each cmdfile be invokable?  (`./bin/autocmdr somecmd options` = `./cmds/somecmd options`)
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
- [ ] Plug-ins should require other plugins
- [-] Take a look at eco plugin.