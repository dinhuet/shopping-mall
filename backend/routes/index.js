const siteRouter = require('./site');
const userRouter = require('./user');
const productRouter = require('./product');
const cartRouter = require('./cart');

function route(app) {
    app.use('/', siteRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
}

module.exports = route;