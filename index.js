'use strict';

const util = require('./util');
const fs   = require('fs').promises;

module.exports = async (app, path = `${__dirname}/../../initializers`) => {
    const initializers = await fs.readdir(path);
    // console.log(initializers)
    const preparedInitializers = initializers
    .filter(util.filterIndex)
    .map(fileName => {
        const file = require(`${path}/${fileName}`);
        return file;
    })
    .sort(util.sortByPriority);
    // console.log(preparedInitializers)
    for (const initializer of preparedInitializers) {
        let execute = initializer.execute || initializer.default.execute;
        // console.log('EXECUTING')
        await execute(app);
    }
};
