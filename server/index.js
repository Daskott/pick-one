'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const staticRouter = require('./static-router');
const apiRoutes = require('./api');
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const models = require('../database/models');
const app = express();

/**
 * 
 * Setup logger
 * alt: (':remote-addr - :remote-user [:date[clf]] "
 *        :method :url HTTP/:http-version" :status :res[content-length] 
 *        :response-time ms')
 */ 
app.use(morgan('dev'));
app.use(bodyParser.json({"limit": '5mb'}));
app.use(staticRouter);
app.use(jwt({ secret: process.env.API_SECRET})
.unless({path: [
              '/api/auth/local', 
              '/api/createUser']}));
app.use(apiRoutes);

// Always return the main index.html on 404 error
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

//sync database modles, then start server
models.sequelize.sync().then(() => {
  // start sever
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});