const siteRouter = require('./site');
const userRouter = require('./user');
const productRouter = require('./product');
const cartRouter = require('./cart');
const adminRouter = require('./admin');

function route(app) {
    app.use('/', siteRouter);
    app.use('/user', userRouter);
    app.use('/api', productRouter);
    app.use('/cart', cartRouter);
    app.use('/admin', adminRouter); // chỉ cần 1 lần duy nhất ở đây
}

module.exports = route;
