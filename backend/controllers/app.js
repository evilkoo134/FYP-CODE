const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');


var urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.options('*', cors());
app.use(cors());
app.use(urlEncodedParser);
app.use(bodyParser.json());

app.get("/user/:id", function (req, res) {

    var userid = req.params.id;
    user.getUserById(userid, function (err, result) {

        if (err) {
            res.status(500).send("Internal Server error")
        } else {
            res.status = 200;
            res.send(result);
        }
    });
});

app.get('/user', function (req, res) {

    user.getUsers(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(result);

            res.status(500).send("Internal Server error");
        }
    });

});

app.post('/user/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, result) {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            //delete result[0]['password'];//clear the password in json data, do not send back to client
            console.log(result);
            res.json({ success: true, UserData: JSON.stringify(result), status: 'You are successfully logged in!' });
            res.send();
        } else {
            res.status(500);
            res.sendStatus(err.statusCode);
        }
    });
});

module.exports = app