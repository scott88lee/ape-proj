const express = require('express');
const app = express();
const db = require('./model/db');

app.use('/', express.static('view'));

app.get('/hello', (req, res) => {
    let exc = db.read('db.json');
    console.log(exc);
    res.send('Hello');
})

app.get('/goodbye', (req, res) => {
    let exc = db.read('db.json');
    exc.happines = "MAXIMUM";
    db.write('db.json', exc);
    res.send('Goodbye');
})

app.get('/api', (req, res) => {
    let exc = db.read('db.json');
    res.send(exc);
})

app.listen(8080, () => {console.log("Server running: Port 8080")})