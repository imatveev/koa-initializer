'use strict';

const util = require('./util');

module.exports = (app) => {
    return util.readdirAsync(`${__dirname}/../../initializers`)
    .then(initializers => {
        return initializers
        .filter(util.filterIndex)
        .sort(util.sortByPriority)
        .reduce((promise, initializer) => {
            return promise
            .then(() => require(`${__dirname}/../../initializers/${initializer}`).execute(app));
        }, Promise.resolve());
    });
};
