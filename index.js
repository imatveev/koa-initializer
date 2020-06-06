'use strict';

const util = require('./util');
const fs   = require('fs').promises;

module.exports = async (app, path = `${__dirname}/../../initializers`) => {
    const initializers = await fs.readdir(path);
    const preparedInitializers = initializers
    .filter(util.filterIndex)
    .map(fileName => {
        const file = require(`${path}/${fileName}`);
        return file;
    })
    .sort(util.sortByPriority);
    for (const initializer of preparedInitializers) {
        let execute = initializer.execute || initializer.default.execute;
        await execute(app);
    }
};
