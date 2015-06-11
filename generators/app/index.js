'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rp = require('request-promise');
var Promise = require('promise');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wonderful ' + chalk.red('node-vscode-types') + ' generator!'
    ));

    var prompts = [{
      //https://github.com/borisyankov/DefinitelyTyped/raw/master/node/node.d.ts
      type: 'confirm',
      name: 'node12',
      message: 'Would you like to grab the latest node version typings?',
      default: true
    },
    {
      //https://github.com/borisyankov/DefinitelyTyped/raw/master/mocha/mocha.d.ts
      type: 'confirm',
      name: 'mocha',
      message: 'Would you like to grab the latest mocha version typings?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var done = this.async();
      var self = this;
      
      var proms = [];
      if (this.props.node12) {
        proms.push(rp("https://github.com/borisyankov/DefinitelyTyped/raw/master/node/node.d.ts", function (err, res, body) {
          self.fs.write(self.destinationPath('typings/node.d.ts'), body);
        }));
      }
      
      if (this.props.mocha) {
        proms.push(rp("https://github.com/borisyankov/DefinitelyTyped/raw/master/mocha/mocha.d.ts", function (err, res, body) {
          self.fs.write(self.destinationPath('typings/mocha.d.ts'), body);
        }));
      }
      
      Promise.all(proms).then(function () {
        done();
      });
    }
  },

  install: function () {
    this.installDependencies();
  }
});
