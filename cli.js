#!/usr/bin/env node

var cli = require('consolar');
var cmd = require('./');

cli.setConsoleCommand('craft-pwd');

cli.init({
  basePath: __dirname
});
