const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/databaseConfig');
const app = require('./controllers/app')
const port = 8080;


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app