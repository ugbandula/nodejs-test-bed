#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app     = require('../app');
var debug   = require('debug')('test-bed:server');
var http    = require('http');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort('8099');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Start the HTTP Server.
 * It will listen on provided port, on all network interfaces.
 */
server.listen(port, function() {
    console.log((new Date()) + ' Server is listening on port ' + port);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

/**
 * Terminates the server process due to a critical error.
 */
function exitOnError(reason) {
    console.log('Server is shutting down due to a critical error');
    console.log('Reason: ' + reason);

    /**
     * Exit from the faulted process after 20 seconds.
     * The timeout has introduced to give enough time to complete all i/o operations
     */
    setTimeout(() => {
        process.exit(1);
    }, 10000);
}
module.exports.exitOnError = exitOnError;
