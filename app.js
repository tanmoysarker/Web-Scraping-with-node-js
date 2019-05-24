const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const magnum = require('./api/routes/magnum');
const damacai = require('./api/routes/damacai');
const sportstoto = require('./api/routes/sportstoto');
const damacai2 = require('./api/routes/damacai2');
const stc = require('./api/routes/stc');
const cashSweep = require('./api/routes/cashSweep');
const singapore4d = require('./api/routes/singapore4d');
const sabah88 = require('./api/routes/sabah88');
const nine93 = require('./api/routes/nine93');
const nine97 = require('./api/routes/nine97');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/magnum', magnum);
app.use('/damacai', damacai);
app.use('/sportstoto', sportstoto);
app.use('/damacai2', damacai2);
app.use('/stc', stc);
app.use('/cashSweep', cashSweep);
app.use('/singapore4d', singapore4d);
app.use('/sabah88', sabah88);
app.use('/nine93', nine93);
app.use('/nine97', nine97);

module.exports = app;