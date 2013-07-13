# Todo list for [autocmdr](https://github.com/Hypercubed/autocmdr)

_(managed using [todo-md](https://github.com/Hypercubed/todo-md))_

### Commander.js

- [ ] Command/event emitter for no args
- [ ] String commands (cmder list -- show)

### Auto commander:

- [x] Add logger
- [ ] Unit tests
- [ ] Support grunt/automaton tasks?
- [ ] Properly handle async actions
- [ ] Autoload some mode_modules/.bin? Support external commands?
- [ ] Use /bin instead of /cmds?
- [ ] Should each cmdfile be envokable?  (`./bin/autocmdr somecmd options` = `./cmds/somecmd options`)
- [ ] Initialize full app (cmds, bin, and package.json)
- [ ] Properly handle options for subcommands
- [ ] Git style options
- [ ] create lib/name.js?
- [ ] require('name') to include all tasks in another autocmdr app?
- [ ] Subcommands, i.e. autocmdr todo <cmd>
- [ ] Run add on edit.
- [ ] Names don't have .js, files do.
- [ ] (add|edit) name[.js], .js is optional