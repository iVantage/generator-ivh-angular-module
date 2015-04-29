'use strict';

var path = require('path')
  , yeoman = require('yeoman-generator')
  , chalk = require('chalk')
  , yosay = require('yosay');

var modulify = function(name) {
  var parts = name.toLowerCase().split(/[-\s.]/g);
  if(parts.length && 'angular' === parts[0]) {
    parts.shift();
  }

  return parts.shift() + '.' + parts.join('-').replace(/-+[^-]/g, function(bndryLetter) {
    return bndryLetter.replace(/-/g, '').toUpperCase();
  });
};

var providerNs = function(moduleName) {
  var ns = moduleName
    .split('.')
    .map(function(part) {
      return part.trim();
    })
    .filter(function(part) {
      return part.length;
    })
    .map(function(part) {
      return part[0].toUpperCase() + part.substr(1);
    })
    .join('');
  return ns[0].toLowerCase() + ns.substr(1);
};

// Must be bound before use
var copyTpl = function(src, dest) {
  this.fs.copyTpl(
    this.templatePath(src),
    this.destinationPath(dest || src),
    this.props
  );
};

// Must be bound before use
var copy = function(src, dest) {
  this.fs.copy(
    this.templatePath(src),
    this.destinationPath(dest || src)
  );
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tiptop ' + chalk.red('IvhAngularModule') + ' generator!'
    ));

    var prompts = [{
      name: 'registryName',
      message: 'What name would your like to register your  module under?',
      default: path.basename(process.cwd())
    },{
      name: 'moduleName',
      message: 'What would you like to name your module?',
      default: modulify(path.basename(process.cwd()))
    },{
      name: 'description',
      message: 'How would you describe your module?',
      default: 'Fixing the world, one curly brace at a time.'
    },{
      name: 'ghName',
      message: 'What is your name on GitHub?',
      default: 'iVantage'
    },{
      type: 'confirm',
      name: 'hasStyles',
      message: 'Does your module need stylesheets?',
      default: false
    },{
      type: 'confirm',
      name: 'doInstall',
      message: 'Shall I install dependencies (node + bower) for you?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      // Extra props
      var now = new Date();
      props.date = {year: now.getFullYear()};
      props.company = 'iVantage Health Analytics, Inc.';
      props.providerNs = providerNs(props.moduleName);
      props.fileNs = props.registryName.replace('angular-', '');
      props.classnameNs = props.fileNs;

      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      copyTpl.bind(this)('_package.json', 'package.json');
      copyTpl.bind(this)('_bower.json', 'bower.json');
      copyTpl.bind(this)('src/scripts/module.js');
      copyTpl.bind(this)(
        'src/scripts/services/foo.js',
        'src/scripts/services/' + this.props.fileNs + '-foo.js');
      copyTpl.bind(this)(
        'test/spec/services/foo.js',
        'test/spec/services/' + this.props.fileNs + '-foo.js');
      if(this.props.hasStyles) {
        copyTpl.bind(this)('src/styles/main.less');
      }
    },

    projectfiles: function () {
      copy.bind(this)('gitignore', '.gitignore');
      copy.bind(this)('editorconfig', '.editorconfig');
      copy.bind(this)('jshintrc', '.jshintrc');
      copy.bind(this)('test/spec/jshintrc', 'test/spec/.jshintrc');
      copy.bind(this)('jscsrc', '.jscsrc');
      copy.bind(this)('travis.yml', '.travis.yml');
      copy.bind(this)('CONTRIBUTING.md');
      copyTpl.bind(this)('README.md');
      copyTpl.bind(this)('LICENSE-MIT');
      copyTpl.bind(this)('_gruntfile.js', 'gruntfile.js');
    }
  },

  install: function () {
    if(this.props.doInstall) {
      this.installDependencies();
    }
  }
});
