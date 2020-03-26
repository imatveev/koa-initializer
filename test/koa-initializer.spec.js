const initializer = require('../');
require('chai/register-should');

describe('koa-initializer', () => {
    it('main', async () => {
        const app = {};
        await initializer(app, './test/initializers');
        app.should.have.property('test2');
        app.test2.should.be.true;
        app.should.have.property('test');
        app.test.should.be.true;
    })
});