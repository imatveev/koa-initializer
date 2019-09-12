'use strict';

module.exports = {
    priority: 1000,
    execute(app) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
};
