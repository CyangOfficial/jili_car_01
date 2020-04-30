var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');

var webRouter = require('./routes/web/index');
var adminRouter = require('./routes/admin');

app.set('secret', 'this is secret key');

app.use(require('cors')()); //cors 解决跨域中间件

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));


// require('./routes/web/index')(app);
app.use('/web/api', webRouter);
app.use('/admin/api', adminRouter);

module.exports = app;
