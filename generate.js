'use strict';

const readline = require('readline');
const util     = require('./util');
const mkdir    = require('mkdirp');

var rl = readline.createInterface({
  input:    process.stdin,
  output:   process.stdout,
  terminal: false
});

rl.question('Initializer name:', async name => {
    await mkdir('../../initializers');
    if (!/\.js$/.test(name)) {
        name = `${name}.js`
    }
    await util.createInitializer(name);
    console.log('Initializer created');
    rl.close();
});
