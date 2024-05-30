const db = require('./databaseConfig');

const tripDB = {
    createTrip: function (destination, startDate, endDate, invitees, callback) {
        const sql = 'INSERT INTO trips (destination, start_date, end_date) VALUES ($1, $2, $3) RETURNING id';
        db.query(sql, [destination, startDate, endDate], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                const tripId = results.rows[0].id;
                const inviteesSql = 'INSERT INTO trip_invitees (trip_id, email) VALUES ($1, $2)';
                const inviteesQueries = invitees.map(email => {
                    return db.query(inviteesSql, [tripId, email]);
                });
                Promise.all(inviteesQueries)
                    .then(() => callback(null, results.rows[0]))
                    .catch(err => callback(err, null));
            }
        });
    },
    getTripsbyuser: function (id, callback) {
        const sql = 'SELECT * FROM trips WHERE user_id = $1';
        db.query(sql, [id], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                return callback(null, results.rows);
            }
        });
    }
    
};

module.exports = tripDB;
