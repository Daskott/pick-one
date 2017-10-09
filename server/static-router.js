const express = require('express');
const path = require('path');
const app = express.Router();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Always return the main index.html on 404 error
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;