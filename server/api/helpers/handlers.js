const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const googleMapsClient = require('../../google-api');
const models = require(`${__dirname}/../../../database/models`);
const passport = require('./passport');
const User = models.User;


/**
 * @parm location: latitude,longitude
 */
const getPlaces = (request, response) => {
    const {location} = request.query;
    const radius = 1500;
    const type = 'restaurant';
    
    if (!location){
        return response.status(403).json({"success:": false, message: 'Latitude & longitude of location is required!'});
    }
    googleMapsClient
    .placesNearby({location, radius, type}, (error, result) => { 
        if (!error) {
            const data = result.json.results;
            return response.status(200).json({"success": true, data});
        } else {
            return response.status(400).json({"success:": false, error});      
        }
    });
};

const createUser = (request, response) => {
    const user = request.body;
    if (!user || !user.password){
        response.status(400).send({success: false, message: 'User password is required!'});
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                // Store hash in your password DB.
                user.password = hash;
    
                //create user record
                User.findOrCreate({ where: { email: user.email }, defaults: user })
                .spread((user, created) => {

                    //check if user was created
                    if (created) {
                        return response.status(201).send({ success: true, message: 'User created!' });
                    } else {
                        return response.status(403)
                            .send({ success: false, message: `A user already exist with this email "${user.email}"` });
                    }
                })
                .catch((error) => response.status(400).send({success: false, message: error.message}));
            })
        });
    }
};

const localAuthentication = (request, response, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (!user) {
            return response.status(401).send({success: false, message: info.message}); 
        }
        if (error) { 
            return response.status(400).send({success: false, message: 'An error occured!'}); 
        }

        const tokenData = Object.assign({}, user.dataValues);
        delete tokenData.password;
        const token = jwt.sign(tokenData, process.env.API_SECRET, {
            expiresIn :'43200m' // expires in 30days
        });
        return response.status(200).json({
            success: true,
            message: 'Authentication successful!',
            firstname: user.firstName,
            lastname:  user.lastName,
            token
        });
        
    })(request, response, next);
    
};

module.exports = {
    getPlaces,
    createUser,
    localAuthentication
};