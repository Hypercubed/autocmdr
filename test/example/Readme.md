example
=============

# Description

A autocmdr CLI app

# Usage

```

  Usage: example [options] [command]

  Commands:

    config [key] [value]   Get and set options
    completion             Print command completion script

  Options:

    -h, --help     output usage information
    -d, --debug    enable debugger
    -V, --version  output the version number


```

## auto-completion

Do one of the following to enable auto-completion in your shell.

* Add completion helper to ~/.bashrc (or ~/.zshrc) `example completion >> ~/.bashrc`
* Add completion to current shell `. <(example completion)`

## config

You can set options with this the `example config` command.  `example config` will list all config variables.  `example config name` will get a value,  `example config name value` will set a value.

# License

MIT

Copyright (c) 2013 J. Harshbarger

# Acknowledgments

Built using [autocmdr](https://github.com/Hypercubed/autocmdr).
