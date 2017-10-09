'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const staticRouter = require('./static-router');
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const app = express();


app.use(morgan('dev'));
app.use(staticRouter);

// start sever
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});