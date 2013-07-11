autocmdr
=============

This is a work in progress, experiment, proof of concept, and/or waist of time.

# Install autocmdr globally

```
npm install -g autocmdr
```

# Use autocmdr as a task runner

You can add, edit, and run tasks using autocmdr. Autocmdr tasks are stored in a subdirectoy of your project.  All tasks located in the cmds/ direcory are automatically loaded.  As a task runner the rest of your project remains untouched.

```
cd yourproject
autocmdr add mytask.js
autocmdr edit mytask.js
autocmdr mytask
```

# As an app builder

If your tasks are useful in other projects you can convert a set of tasks to an semi-independant app. 

```
cd yourproject
autocmdr init myapp
npm link .

cd somewhere
myapp mytask
```

# Share

Use git or npm to share.
