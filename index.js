'use strict';

var req = require('request');
var cli = require('consolar');
var pkg = require('./package.json');

var Cmd = function() {
  this.cli;
  this.password;
};

Cmd.prototype.init = function(cli) {
  this.cli = cli;
};

Cmd.prototype.run = function() {
  this.cli.logStep('Generating hash for (%s)', [this.password]);

  var self = this;

  req.post(
    pkg.pgenUrl || 'https://selv.in/pgen/generate',
    {
      form: {
        password: this.password
      }
    },
    function(error, response, body) {

      if (error) {
        self.cli.logFailure(error);
        self.cli.halt();
      }

      try {
        body = JSON.parse(body);

        if (body.status !== 'OK') {
          self.cli.logFailure(body.result);
          self.cli.halt();
        } else {
          self.cli.logSuccess(body.result);
          self.cli.end();
        }
      } catch (e) {
        self.cli.logFailure(e.message);
        self.cli.end();
      }
    }
  );
};

Cmd.prototype.validate = function() {
  this.cli.logStep('Running input validation');
  this.cli.requireArgs(['password']);

  this.password = this.cli.namedArgs['password'];

  if (!this.cli.lodash.isString(this.password) || !this.password.match(/(.){6,}/)) {
    this.cli.logFailure('The password must be at least 6 characters in length');
    this.cli.halt();
  }

  this.cli.logSuccess('Input validated.');
};

Cmd.prototype.renderHelp = function() {
  console.log(this.cli.swig.renderFile(__dirname + '/usage.txt', this.cli));
  process.exit();
};

module.exports = (function() { return new Cmd(); })();
