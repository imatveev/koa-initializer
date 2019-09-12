'use strict';

import util from'./util.js';
import pathLib, { dirname } from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (app, path = `${__dirname}/../../initializers`) => {
    return util.readdirAsync(path)
        .then(initializers => {
            return Promise.all(initializers
                .filter(util.filterIndex)
                .map(fileName => {
                    const relPath = pathLib.relative(__dirname, path + `/${fileName}`)
                        .replace(/\\/g, '/');
                    return import(relPath)
                })).then(files => {
                     return files.sort(util.sortByPriority)
                         .reduce((promise, initializer) => {
                              return promise
                                  .then(() => {
                                      let execute = initializer.execute || initializer.default.execute;
                                      return execute(app)
                                   });
                         }, Promise.resolve());
                })
        });
};
