# koa-initializer
 
A koa plugin for handling async/sync initializers of your application.
## Installation
    npm install koa-initializer
## When should I use koa-initializer?
You need to add synchronous or asynchronous code, that must be executed before your koa app starts.
## API
    const initializer = require('koa-initializer');
    const Koa         = require('koa');
    const app         = new Koa();
 
    initializer(app)
    .then(() => {
        //Your application code
    });
 
    //or (in case of koa v3)
 
    await initializer(app);
    //Your application code
 
So as you can see initializer returns promise;
## Initializer file path and structure
Your app root folder should contain "initializers" folder with initializers files (name of file irrelevant).
initializer.js:

    'use strict';
 
    module.exports = {
        priority: 800, // Any diapason (bigger number - lower priority)
        execute(app) { // Executable function (takes app as parameter)
            //Any synchronous/asynchronous code (asynchronous must return promise)
        }
    };

