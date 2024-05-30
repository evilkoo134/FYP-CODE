const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/databaseConfig');
const app = require('./controllers/app')
var cors = require('cors')
const port = 8080;

app.use(cors())

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;