const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const magnum = require('./api/routes/magnum');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/magnum', magnum);

module.exports = app;