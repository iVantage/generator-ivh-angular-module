# generator-ivh-angular-module [![Build Status](https://secure.travis-ci.org/jtrussell/generator-ivh-angular-module.png?branch=master)](https://travis-ci.org/jtrussell/generator-ivh-angular-module)

> A [Yeoman](http://yeoman.io) generator for AngularJS modules.


## Getting Started

What's Yeoman you say? Check out [their page](http://yeoman.io/). We'll wait
here.


## About

There are a handful of generators out there for scaffolding out AngularJS apps.
This is not one of those. Here we're concerned with building small and focused
modules. I.e. the stuff that lives in your `bower_components` folder.


### Layout

At a high level the final structure looks like this:

```
.
+-- src
|   +-- scripts
|   |   +-- services
|   |   |   +-- *-foo.js
|   |   +-- module.js
|   +-- styles (optional)
|   |   +-- main.less
+-- test
|   +-- spec
|   |   +-- services
|   |   |   +-- *-foo.js
|   |   .jshintrc
+-- .editorconfig
+-- .gitignore
+-- .jscsrc
+-- .jshintrc
+-- .travis.yml
+-- gruntfile.js
+-- LICENSE-MIT
+-- package.json
+-- README.md
```

The resulting `gruntfile.js` has tasks for building, linting, jscs-ing,
less-ifying + cssmin-ifying (if you choose to include styles), and watching
everything to do what it needs automatically.


### Installation and Usage

This generator lives under the name `generator-ivh-angular-module`:

```
npm install -g generator-ivh-angular-module
```

Once you have it you can just run the following to get started:

```
yo ivh-angular-module
```

Then follow the prompts. The generator will place files directly
into the directory it was invoked from, it will also make guesses at things like
your module's name based on the name of that directory.


## License

MIT
