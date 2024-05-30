const db = require("./databaseConfig");
const bcrypt = require('bcryptjs');

const userDB = {
    registerUser: function (email, password, callback) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const sql = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';

        db.query(sql, [email, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                return callback(null, results.rows[0]);
            }
        });
    },

    loginUser: function (email, password, callback) {
        const sql = 'SELECT * FROM users WHERE email = $1';

        db.query(sql, [email], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                if (results.rowCount === 1) {
                    const storedPassword = results.rows[0].password;

                    bcrypt.compare(password, storedPassword, (err, isMatch) => {
                        if (err) {
                            return callback(err, null);
                        } else if (isMatch) {
                            return callback(null, results.rows[0]);
                        } else {
                            const err = new Error("email or password does not match.");
                            err.statusCode = 401;
                            return callback(err, null);
                        }
                    });
                } else {
                    const err = new Error("email or password does not match.");
                    err.statusCode = 401;
                    return callback(err, null);
                }
            }
        });
    },

    getUserByEmail: function (email, callback) {
        const sql = 'SELECT * FROM users WHERE email = $1';
        db.query(sql, [email], function (err, result) {
            if (err) {
                console.error('Error fetching user by email:', err);
                return callback(err, null);
            }
            return callback(null, result.rows[0]);
        });
    },

    /*
    getUserById: function (userid, callback) {
        const sql = 'SELECT * FROM users WHERE id = $1';

        db.query(sql, [userid], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                if (results.rowCount > 0) {
                    return callback(null, results.rows[0]);
                } else {
                    const err = new Error('User not found');
                    err.statusCode = 404;
                    return callback(err, null);
                }
            }
        });
    },

    getUsers: function (callback) {
        const sql = 'SELECT * FROM users';

        db.query(sql, (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                return callback(null, results.rows);
            }
        });
    },

    getEmails: function (email, callback) {
        const sql = 'SELECT * FROM users WHERE email = $1';

        db.query(sql, [email], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                if (results.rowCount > 0) {
                    return callback(null, results.rows[0]);
                } else {
                    const err = new Error('Email not found');
                    err.statusCode = 404;
                    return callback(err, null);
                }
            }
        });
    },

    loginUser: function (email, password, callback) {
        const sql = 'SELECT * FROM users WHERE email = $1';

        db.query(sql, [email], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                if (results.rowCount === 1) {
                    const storedPassword = results.rows[0].password;

                    if (password === storedPassword) {
                        return callback(null, results.rows[0]);
                    } else {
                        const err = new Error("UserID/Password does not match.");
                        err.statusCode = 401;
                        return callback(err, null);
                    }
                } else {
                    const err = new Error("UserID/Password does not match.");
                    err.statusCode = 401;
                    return callback(err, null);
                }
            }
        });
    },

    insertUser: function (email, password, callback) {
        const sql = 'INSERT INTO users (email, password,) VALUES ($1, $2,) RETURNING id';

        db.query(sql, [email, password, temp_secret], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                return callback(null, results.rows[0]);
            }
        });
    },

    updateUser: function (email, password, id, callback) {
        const sql = 'UPDATE users SET email = $1, password = $2 WHERE id = $3';

        db.query(sql, [email, password, id], (error, results) => {
            if (error) {
                console.error('Error executing query', error.stack);
                return callback(error, null);
            } else {
                return callback(null, results.rowCount > 0);
            }
        });
    }*/
};
module.exports = userDB;