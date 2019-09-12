'use strict';
import fs from 'fs';
import mkdirp from 'mkdirp';

export default {

    filterIndex(file) {
        return file !== 'index.js' && !~file.indexOf('.map');
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
    },

    sortByPriority(prev, next) {
        let prevPriority = prev.priority || prev.default.priority;
        let nextPriority = next.priority || next.default.priority;
        return nextPriority - prevPriority;
    }
};
