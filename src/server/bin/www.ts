#!/usr/bin/env node

import { createServer } from 'http';
import { normalizedPort } from '../utility/http';

import { serverPort } from '../config/configuration'
import application from '../application';

// Set port for server to listen on
const port = normalizedPort(process.env.PORT || serverPort);
application.set('port', port);

// Set up HTTP server
const server = createServer(application);
// Set default timeout for HTTP requests to server
server.timeout = 6000;
// Listen on previously determined port number, on all network interfaces
server.listen(port);

// Listen for and handle 'error' events
server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'number'
        ? `Port ${port}`
        : `Pipe ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCESS':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// Listen for and handle 'listening' events
server.on('listening', () => {
    const addr = server.address();
    if (addr) {
        const bind = typeof addr === 'string'
            ? `pipe ${addr}`
            : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    } else {
        console.error(`Problem retrieving server address`);
        process.exit(1);
    }
});