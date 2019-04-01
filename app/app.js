///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
let express         = require('express');
let path            = require('path');
let favicon         = require('serve-favicon');
let logger          = require('morgan');
let cookieParser    = require('cookie-parser');
let bodyParser      = require('body-parser');
let morgan          = require('morgan');
let fs              = require('fs');
let util            = require('util');
let cors            = require('cors');

///////////////////////////////////////////////////////////////
// Bootstrap the Application
///////////////////////////////////////////////////////////////
let app = express();

/**
 * Redirects the output to a debug file
 */
let log_file        = fs.createWriteStream(__dirname + '/../logs/console.log', {flags : 'w'});
let log_stdout      = process.stderr;

console.log = function(d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

console.error = function(d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

/**
 * Displays the ASCII logo text
 */
let figlet = require("figlet");
let logoText = 'Test Bed';

figlet.text(logoText, function(error, data) {
    if (error)
        console.error(error);
    else {
        console.log("==================================================");
        console.log('* Test Bed Services                            ');
        console.log('*                                                 ');
        console.log(data);
        console.log("-------------------------------------------------");
    }
});

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(morgan('dev')); // log requests to the console
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Bootstrap routes
 */
require('./routes/index')(app);

/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Error handlers
 * --------------
 *
 * Development error handler; will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production error handler; no stacktraces leaked to user
 */
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
