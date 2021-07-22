const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./utils/middlewares/errorHandler')
const setHeaders =  require('./utils/middlewares/setHeaders')
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

//Seteamos los headers
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(setHeaders) 

//Seteamos las rutas
server.use(cors());
server.use('/', routes);

//Middleware de control de errores
server.use(errorHandler);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
