const db = require('./databaseConfig');

const itineraryDB = {
    insertItinerary: function (user_id, destination, start_date, end_date, itinerary_details, callback) {
        const sql = `INSERT INTO itineraries (user_id, destination, start_date, end_date, itinerary_details)
                     VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        db.query(sql, [user_id, destination, start_date, end_date, itinerary_details], function (err, result) {
            if (err) {
                console.error('Error inserting itinerary:', err);
                return callback(err, null);
            }
            return callback(null, result.rows[0]);
        });
    },

    updateItinerary: function (itinerary_id, user_id, destination, start_date, end_date, itinerary_details, callback) {
        const sql = `UPDATE itineraries
                     SET destination = $2, start_date = $3, end_date = $4, itinerary_details = $5
                     WHERE id = $1 AND user_id = $6`;
        db.query(sql, [itinerary_id, destination, start_date, end_date, itinerary_details, user_id], function (err, result) {
            if (err) {
                console.error('Error updating itinerary:', err);
                return callback(err, null);
            }
            return callback(null, result.rowCount > 0);
        });
    },

    getItinerariesByUser: function (user_id, callback) {
        const sql = 'SELECT * FROM itineraries WHERE user_id = $1';
        db.query(sql, [user_id], function (err, result) {
            if (err) {
                console.error('Error fetching itineraries by user ID:', err);
                return callback(err, null);
            }
            return callback(null, result.rows);
        });
    },

    getItineraryById: function (itinerary_id, callback) {
        const sql = 'SELECT * FROM itineraries WHERE id = $1';
        db.query(sql, [itinerary_id], function (err, result) {
            if (err) {
                console.error('Error fetching itinerary by ID:', err);
                return callback(err, null);
            }
            return callback(null, result.rows[0]);
        });
    }
};

module.exports = itineraryDB;
