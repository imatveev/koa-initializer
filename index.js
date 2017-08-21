'use strict';

const util = require('./util');

module.exports = (app, path = `${__dirname}/../../initializers`) => {
    return util.readdirAsync(path)
    .then(initializers => {
        return initializers
        .filter(util.filterIndex)
        .map(fileName => {
            let file = require(`${path}/${fileName}`);
            return file;
        })
        .sort(util.sortByPriority)
        .reduce((promise, initializer) => {
            return promise
            .then(() => {
                let execute = initializer.execute || initializer.default.execute;
                return execute(app)
            });
        }, Promise.resolve());
    });
};
