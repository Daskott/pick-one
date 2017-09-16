'use strict';
require('dotenv').config();
const express = require('express');
const staticRouter = require('./static-router');
const apiRoutes = require('./api');
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
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
app.use(apiRoutes);
app.use(staticRouter); // should be @bottom coz of 404

// start sever
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});