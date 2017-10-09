const express = require('express');
const api = express.Router();
const { passport, handlers } = require('./helpers');

api.use(passport.initialize());

api.get('/api/places/', handlers.getPlaces);

api.post('/api/createUser', handlers.createUser);

api.post('/api/auth/local', handlers.localAuthentication);

module.exports = api;