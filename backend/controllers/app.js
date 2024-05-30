const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
//const config = require('./config'); 
const user = require('../models/user');
const itinerary = require('../models/itinerary');
const trip = require('../models/trip'); 
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/users', function (req, res) {
    const { email, password } = req.body;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({ success: false, message: 'Not an email address' });
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    user.registerUser(email, password, function (err, result) {
        if (!err) {
            res.status(201).json({ success: true, message: 'Sign Up successful', userID: result.insertId });
        } else {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ success: false, message: 'Email already exists' });
            } else {
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
        }
    });
});

app.post('/users/login', function (req, res) {
    const { email, password } = req.body;

    user.loginUser(email, password, function (err, result) {
        if (!err) {
            res.status(200).json({ success: true, message: 'Login successful', user: result });
        } else {
            res.status(401).json({ success: false, message: 'The email or password entered is incorrect' });
        }
    });
});

app.post('/trip', function (req, res) {
    const { destination, startDate, endDate, invitees } = req.body;

    if (!destination || !startDate || !endDate) {
        return res.status(400).json({ success: false, message: 'fields are required' });
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const inviteesArray = invitees.split(',').map(email => email.trim());
    for (const email of inviteesArray) {
        if (email && !emailPattern.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email address' });
        }
    }

    trip.createTrip(destination, startDate, endDate, inviteesArray, function (err, result) {
        if (!err) {
            res.status(201).json({ success: true, message: 'Trip planned successfully', tripID: result.insertId });
        } else {
            res.status(500).json({ success: false, message: 'Error' });
        }
    });
});

app.get('/trip', function (req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    user.getUserByEmail(email, function (err, userResult) {
        if (err || !userResult) {
            return res.status(400).json({ success: false, message: 'Invalid user' });
        }

        const userId = userResult.id;

        trip.getTripsByUser(userId, function (err, trips) {
            if (!err) {
                res.status(200).json({ success: true, trips: trips });
            } else {
                res.status(500).json({ success: false, message: 'Error' });
            }
        });
    });
});

// Save itinerary
app.post('/content/itineraries', function(req, res) {
    const { user_email, destination, start_date, end_date, itinerary_details } = req.body;

    user.getUserByEmail(user_email, function(err, userResult) {
        if (err || !userResult) {
            console.error('Failed to retrieve user:', err);
            return res.status(400).json({ success: false, message: 'Invalid user' });
        }

        const user_id = userResult.id;

        itinerary.insertItinerary(user_id, destination, start_date, end_date, itinerary_details, function(err, result) {
            if (err) {
                console.error('Failed to save itinerary:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            res.status(201).json({ success: true, message: 'Itinerary saved successfully', itineraryID: result.id });
        });
    });
});

// Get itineraries for a user
app.get('/content/itineraries/:user_id', function(req, res) {
    const user_id = parseInt(req.params.user_id, 10); // Ensure user_id is an integer
    if (isNaN(user_id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    itinerary.getItinerariesByUser(user_id, function(err, result) {
        if (err) {
            console.error('Failed to fetch itineraries:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        res.status(200).json({ success: true, itineraries: result });
    });
});

// Get user by email
app.get('/users/email/:email', function(req, res) {
    const email = req.params.email;

    user.getUserByEmail(email, function(err, userResult) {
        if (err || !userResult) {
            console.error('Failed to retrieve user:', err);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: userResult });
    });
});

app.get('/content/itinerary/:itinerary_id', function(req, res) {
    const itinerary_id = parseInt(req.params.itinerary_id, 10); // Ensure itinerary_id is an integer
    if (isNaN(itinerary_id)) {
        return res.status(400).json({ success: false, message: 'Invalid itinerary ID' });
    }

    itinerary.getItineraryById(itinerary_id, function(err, result) {
        if (err) {
            console.error('Failed to fetch itinerary:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        res.status(200).json({ success: true, itinerary: result });
    });
});

/*app.get('/users', function (req, res) {
    user.getUsers(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            console.log(result);
            res.status(500).send("Internal Server error");
        }
    });
});

app.post('/users/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, result) {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, UserData: JSON.stringify(result), status: 'You are successfully logged in!' });
        } else {
            res.status(500);
            res.sendStatus(err.statusCode);
        }
    });
});

app.post('/users', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.registerUser(email, password, function (err, result) {
        if (!err) {
            res.status(201).json({ success: true, message: 'Registration successful', userID: result.insertId });
        } else {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ success: false, message: 'Email already exists' });
            } else {
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
        }
    });
});*/


module.exports = app;