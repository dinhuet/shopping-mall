const siteRouter = require('./site');
const userRouter = require('./user');
const productRouter = require('./product');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const paymentRouter = require('./payment');


function route(app) {
    app.use('/', siteRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
    app.use('/order', orderRouter)
    app.use('/payment', paymentRouter);
}

module.exports = route;
