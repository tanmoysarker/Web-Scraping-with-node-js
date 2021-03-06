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
const magnum2 = require('./api/newRoutes/magnum2');
const damacai3 = require('./api/newRoutes/damacai3');
const sportstoto2 = require('./api/newRoutes/sportstoto2');
const singapore4d2 = require('./api/newRoutes/singapore4d2');
const sabah882 = require('./api/newRoutes/sabah882');
const stc2 = require('./api/newRoutes/stc2');
const cashSweep2 = require('./api/newRoutes/cashSweep2');
const nine932 = require('./api/newRoutes/nine932');
const nine972 = require('./api/newRoutes/nine972');
const sportstoto56 = require('./api/routes/sportstoto56') 
const sportstoto562 = require('./api/newRoutes/sportstoto562') 

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
app.use('/magnum2', magnum2);
app.use('/damacai3', damacai3);
app.use('/sportstoto2', sportstoto2);
app.use('/singapore4d2', singapore4d2);
app.use('/sabah882', sabah882);
app.use('/stc2', stc2);
app.use('/cashSweep2', cashSweep2);
app.use('/nine932', nine932);
app.use('/nine972', nine972);
app.use('/sportstoto56',sportstoto56);
app.use('/sportstoto562',sportstoto562);

module.exports = app;