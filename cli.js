#!/usr/bin/env node

var cli = require('consolar');
var cmd = require('./');

cli.setConsoleCommand('craft-pwd');

cli.init({
  name: '',
  basePath: __dirname
});
