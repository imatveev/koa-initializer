'use strict';

const fs = require('fs').promises;

module.exports = {

    filterIndex(file) {
        return file !== 'index.js' && !~file.indexOf('.map');
    },

    filterByPriority(prev, next) {
        return prev.priority > next.priority
    },

    get template() {
        return fs.readFile('./initializer.js', 'utf-8');
    },

    async createInitializer(name) {
        const template = await this.template;
        await fs.writeFile(`${__dirname}/../../initializers/${name}`, template)
    },

    sortByPriority(prev, next) {
        let prevPriority = prev.priority || prev.default.priority;
        let nextPriority = next.priority || next.default.priority;
        return nextPriority - prevPriority;
    }
};
