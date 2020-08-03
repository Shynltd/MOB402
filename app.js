var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var brandRoutes = require('./routes/brandRoutes');

var carRouter = require('./routes/carRoutes');
var hospitalRoutes = require('./routes/hospitalRoutes');
var patientsRoutes = require('./routes/patientsRoutes');

var mongoose = require('./monggo/monggosv');

var lodash = require('lodash');
var fileUpload = require('express-fileupload');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(fileUpload({
    createParentPath:true
}));
app.use(cors());


app.use('/brands', brandRoutes);
app.use('/car', carRouter);
app.use('/patients', patientsRoutes);
app.use('/hospital', hospitalRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
