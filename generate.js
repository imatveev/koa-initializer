'use strict';

import readline from 'readline';
import util from './util';

const rl = readline.createInterface({
  input:    process.stdin,
  output:   process.stdout,
  terminal: false
});

rl.question('Initializer name:', name => {
    util.mkdir('../../initializers')
    .then(() => {
        if (!/\.js$/.test(name)) {
            name = `${name}.js`
        }
        return util.createInitializer(name);
    })
    .then(() => {
        console.log('Initializer created');
    })
    .catch(err => console.error(err))
    rl.close();
});
