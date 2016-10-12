'use strict';

const fs     = require('fs');
const mkdirp = require('mkdirp');

module.exports = {

    filterIndex(file) {
        return file !== 'index.js';
    },

    readdirAsync(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (error, files) => {
                if(error) {
                    return reject(error);
                }
                resolve(files);
            })
        })
    },

    filterByPriority(prev, next) {
        return prev.priority > next.priority
    },

    mkdir(name) {
        return new Promise((resolve, reject) => {
            mkdirp(name, error => {
                if(error) {
                    return reject(error);
                }
                resolve();
            });
        })
    },

    get template() {
        return new Promise((resolve, reject) => {
            fs.readFile('./initializer.js', 'utf-8', (error, initializer) => {
                if(error) {
                    return reject(error);
                }
                resolve(initializer);
            })
        })
    },

    createInitializer(name) {
        this.template
        .then(data => {
            fs.writeFile(`${__dirname}/../../initializers/${name}`, data, error => {
                if(error) {
                    throw error;
                }
            });
        });
    }
};
