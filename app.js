const express = require('express');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3031;

app.use('/', routes);

const server = http.createServer(app);
server.listen(port, console.log(`Listening to port: ${port}`));

const socket = socketio.listen(server);
require('./sockets')(socket);
