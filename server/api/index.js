const express = require('express');
const axios = require('axios');
const api = express.Router();
const googleMapsClient = require('../google-api');

/**
 * @parm location: latitude,longitude
 */
api.get('/api/places/', (request, response) => {
    const {location} = request.query;
    const radius = 1500;
    const type = 'restaurant';
    googleMapsClient
    .placesNearby({location, radius, type}, (error, result) => { 
        if (!error) {
            const data = result.json.results;
            return response.status(200).json({"success": true, data});
        } else {
            return response.status(400).json({"success:": false, error});      
        }
    });
});

module.exports = api;