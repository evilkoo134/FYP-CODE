const { Pool } = require('pg');

// PostgreSQL connection settings
const pool = new Pool({
    user: 'fyp',
    host: 'localhost',
    database: 'FYP',
    password: 'password',
    port: 5433,
});

// Connect to PostgreSQL
pool.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});
