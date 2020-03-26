'use strict';

module.exports = {
    priority: 1000,
    execute(app) {
        app.test = false;
    }
};
